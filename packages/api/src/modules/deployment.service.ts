import { Inject, Injectable, Scope } from "@nestjs/common";
import { ModuleRef, REQUEST } from "@nestjs/core";
import { DBInstance } from "src/db";

import { Sequelize } from "sequelize-typescript";
import { USER_DB_CONFIG } from "src/db/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { EntitiesMetadataStorage } from "@nestjs/sequelize/dist/entities-metadata.storage";
import { DEFAULT_CONNECTION_NAME } from "@nestjs/sequelize/dist/sequelize.constants";

@Injectable()
/**
 *
 * Keep track of connections to multiple admin and client databases
 * Admin connections setup tables
 * Client connections used for operations
 *
 * This is used instead of intialising sequelize via module import forRoot,
 * as that will populate a single global service used in all requests whereas
 * the api will want to switch connection depending on request
 */
export class DeploymentDBService {
  private adminClients = {};
  private userClients: Record<string, Sequelize> = {};
  private globalClient: Sequelize;
  private models: Function[];

  // https://stackoverflow.com/questions/52665421/angular-inject-service-into-decorator
  constructor(private moduleRef: ModuleRef) {
    DeploymentDBService.service = this;
  }

  private static service: DeploymentDBService | undefined = undefined;

  public static getService(): DeploymentDBService {
    if (!DeploymentDBService.service) {
      throw new Error("DeploymentDBService not initialized");
    }
    return DeploymentDBService.service;
  }

  async getSequelizeClient(dbName: string) {
    //
    if (!this.globalClient) {
      this.globalClient = this.moduleRef.get(Sequelize, { strict: false });
      // TODO - want to prevent connection being used
      this.models = EntitiesMetadataStorage.getEntitiesByConnection(DEFAULT_CONNECTION_NAME);
      this.globalClient.addHook("beforeConnect", () => {
        console.log("beforeConnect");
      });
    }
    //
    if (!this.adminClients[dbName]) {
      console.log("db init", dbName);
      const adminClient = await new DBInstance(dbName).setup();
      this.adminClients[dbName] = adminClient;
    }
    //
    if (!this.userClients[dbName]) {
      const userClient = await this.createConnectionFactory({
        ...USER_DB_CONFIG,
        database: dbName,
        autoLoadModels: true,
        name: dbName,
        // tables will be initialised via sequelizer
        synchronize: false,
        // TODO - expose env pooling options
        pool: {
          max: 50,
          min: 0,
          idle: 10000,
        },
      });
      console.log(dbName, userClient.models);
      this.userClients[dbName] = userClient;
    }

    // TODO - maybe try register sequelize as a lazy module?
    // global injected version not suitable
    console.log("get client", dbName, this.userClients[dbName].config);
    return this.userClients[dbName];
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

@Injectable({ scope: Scope.REQUEST })
/** Alternative to param decorator used for services */
export class DeploymentModelService {
  constructor(@Inject(REQUEST) private request: Request, private service: DeploymentDBService) {}

  get<T extends Function>(entity: T) {
    // TODO - add better typings
    const sequelize: Sequelize = (this.request.body as any).sequelize;
    const model = sequelize.model<T, T>(entity.name) as any;
    return model as T;
    // NOTE - assumes already gone through middleware
    // const sequelize:Sequelize = this.request.body.sequelize
    // console.log("get model", this.request, this.service);
  }
}
