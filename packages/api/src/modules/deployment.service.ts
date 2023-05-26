import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { DBInstance } from "src/db";

import { Sequelize } from "sequelize-typescript";
import { USER_DB_CONFIG } from "src/db/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { EntitiesMetadataStorage } from "@nestjs/sequelize/dist/entities-metadata.storage";
import { DEFAULT_CONNECTION_NAME } from "@nestjs/sequelize/dist/sequelize.constants";
import { SequelizeHooks } from "sequelize/types/hooks";

@Injectable()
/**
 *
 * Keep track of connections to multiple admin and client databases
 * Admin connections setup tables
 * Client connections used for operations
 *
 * This is used instead of initialising sequelize via module import forRoot,
 * as that will populate a single global service used in all requests whereas
 * the api will want to switch connection depending on request
 */
export class DeploymentService {
  /** Active sequelize client */
  public client: Sequelize;

  /** List of all user clients initialised */
  private userClients: Record<string, Sequelize> = {};
  private globalClient: Sequelize;
  private models: Function[];

  private hooks: { hookType: keyof SequelizeHooks; fn: any }[] = [];

  constructor(private moduleRef: ModuleRef) {
    DeploymentService.service = this;
  }

  /**
   * Provide access to any globally instantiated instance of service without injection
   * (e.g. functional utilities)
   * https://stackoverflow.com/questions/52665421/angular-inject-service-into-decorator
   */
  public static getService(): DeploymentService {
    if (!DeploymentService.service) {
      throw new Error("DeploymentService not initialized");
    }
    return DeploymentService.service;
  }
  private static service: DeploymentService | undefined = undefined;

  /**
   * Access sequelize methods for a given model
   * @param entity Sequelize model representation of db table and columns
   */
  public model<T extends Function>(entity: T) {
    // Client init depends on middleware. Ensure currently in use
    if (!this.client) {
      throw new Error("Deployment client not initialized");
    }
    const model = this.client.model<T, T>(entity.name) as any;
    return model as T;
  }

  /** Specify sequelize hooks to apply to clients. Updates all existing clients and will be registered on future **/
  public registerHook<K extends keyof SequelizeHooks>(hookType: K, fn: SequelizeHooks[K]) {
    for (const client of Object.values(this.userClients)) {
      client.addHook(hookType, fn);
    }
    this.hooks.push({ hookType, fn });
  }

  /** Specify default db connection to be used for any subsequent operations */
  async setDeploymentDB(dbName: string) {
    // Ensure sequelize has been initialised with default credentials to use as a base
    if (!this.globalClient) {
      this.globalClient = this.moduleRef.get(Sequelize, { strict: false });
      // TODO - want to prevent connection being used
      this.models = EntitiesMetadataStorage.getEntitiesByConnection(DEFAULT_CONNECTION_NAME);
    }

    // Create new client for custom db connection
    if (!this.userClients[dbName]) {
      await new DBInstance(dbName).setup();
      await this.createNewClient(dbName);
    }

    this.client = this.userClients[dbName];
    return this.client;
  }

  /**
   * Create a new sequelize user client for the named DB
   * @param dbName
   */
  private async createNewClient(dbName: string) {
    const userClient = await this.createConnectionFactory({
      ...USER_DB_CONFIG,
      database: dbName,
      autoLoadModels: true,
      name: dbName,
      // tables will be initialised via sequelize
      synchronize: false,
      // TODO - expose env pooling options
      pool: {
        max: 50,
        min: 0,
        idle: 10000,
      },
    });
    // ensure all hooks are registered
    for (const { hookType, fn } of this.hooks) {
      userClient.addHook(hookType, fn);
    }
    // store globally to allow future access
    this.userClients[dbName] = userClient;
  }

  /**
   * Adapted from nestjs/sequelize core module
   * @param options
   * @returns
   */
  private async createConnectionFactory(options: SequelizeModuleOptions): Promise<Sequelize> {
    const sequelize = new Sequelize(options);

    if (!options.autoLoadModels) {
      return sequelize;
    }

    // Load default client models to new sequelize client
    sequelize.addModels(this.models as any);

    await sequelize.authenticate();

    if (typeof options.synchronize === "undefined" || options.synchronize) {
      await sequelize.sync(options.sync);
    }
    return sequelize;
  }
}

// DEPRECATED - CC 2023-04-29 - prefer set sequelize client via service instead
// of extracting from request

// @Injectable({ scope: Scope.REQUEST })
// /**
//  * Alternative to param decorator used for services
//  * */
// export class DeploymentRequestService {
//   constructor(@Inject(REQUEST) private request: Request, private service: DeploymentService) {}

//   get<T extends Function>(entity: T) {
//     // TODO - add better typings
//     const sequelize: Sequelize = (this.request.body as any).sequelize;
//     const model = sequelize.model<T, T>(entity.name) as any;
//     return model as T;
//     // NOTE - assumes already gone through middleware
//     // const sequelize:Sequelize = this.request.body.sequelize
//     // console.log("get model", this.request, this.service);
//   }
// }
