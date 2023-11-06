import { Global, Injectable } from "@nestjs/common";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { EntitiesMetadataStorage } from "@nestjs/sequelize/dist/entities-metadata.storage";
import { DEFAULT_CONNECTION_NAME } from "@nestjs/sequelize/dist/sequelize.constants";
import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { SequelizeHooks } from "sequelize/types/hooks";
import { DBInstance } from "src/db";
import { USER_DB_CONFIG } from "src/db/config";

/**
 * Keep track of all active database connections
 * Used by deployment service, but separated into global service to prevent
 * recreation on request
 */
@Global()
@Injectable()
export class ConnectionManagerService {
  /** List of all user clients initialised */
  public userClients: Record<string, Sequelize> = {};

  public queryInterfaces: Record<string, QueryInterface> = {};

  private hooks: { hookType: keyof SequelizeHooks; fn: any }[] = [];

  constructor() {
    console.log(["[Connection Manager] constructor"]);
  }

  public async setupConnection(dbName: string) {
    await new DBInstance(dbName).setup();
    await this.createNewClient(dbName);
  }

  /** Specify sequelize hooks to apply to clients. Updates all existing clients and will be registered on future **/
  public registerHook<K extends keyof SequelizeHooks>(hookType: K, fn: SequelizeHooks[K]) {
    for (const client of Object.values(this.userClients)) {
      client.addHook(hookType, fn);
    }
    this.hooks.push({ hookType, fn });
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

    const queryInterface = userClient.getQueryInterface();
    this.queryInterfaces[dbName] = queryInterface;

    console.log("[Connection Manager] Client Created", dbName);

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
    const models = EntitiesMetadataStorage.getEntitiesByConnection(DEFAULT_CONNECTION_NAME);
    // Load default client models to new sequelize client
    sequelize.addModels(models as any);

    await sequelize.authenticate();
    // TODO - consider updating models here instead (?)
    // TODO - need to identify where bottleneck actually is? e.g. injecting request?

    if (typeof options.synchronize === "undefined" || options.synchronize) {
      await sequelize.sync(options.sync);
    }
    return sequelize;
  }
}
