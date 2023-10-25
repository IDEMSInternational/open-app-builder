import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

import { SequelizeHooks } from "sequelize/types/hooks";
import { Request } from "express";
import { ConnectionManagerService } from "src/services/connection-manager";
import { environment } from "src/environment";

/**
 * Handle requests targetting different database endpoints
 * Created per-request to try ensure model operations are carried out via correct db connection
 */
@Injectable({ scope: Scope.REQUEST })
export class DeploymentService {
  public dbName: string;

  constructor(
    private connectionManager: ConnectionManagerService,
    @Inject(REQUEST) readonly request: Request
  ) {
    DeploymentService.service = this;
    this.dbName = (request.headers["x-deployment-db-name"] as string) || environment.APP_DB_NAME;
  }

  public get client() {
    const client = this.connectionManager.userClients[this.dbName || "_invalid_"];
    // Client init depends on middleware. Ensure currently in use
    if (!client) {
      throw new Error("Deployment client not initialized: " + this.dbName);
    }
    return client;
  }

  public get queryInterface() {
    const queryInterface = this.connectionManager.queryInterfaces[this.dbName || "_invalid_"];
    // queryInterface init depends on middleware. Ensure currently in use
    if (!queryInterface) {
      throw new Error("Deployment queryInterface not initialized: " + this.dbName);
    }
    return queryInterface;
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
    const model = this.client.model<T, T>(entity.name);
    // HACK - when accessing client model ensure using correct query interface
    // (appears issue when creating models globally will assume default interface)
    // (this interface is used when calling various set/upsert operations)
    model.sequelize.getQueryInterface = () => {
      // console.log( "[MODEL] get query interface", this.dbName, model.sequelize.config.database, this.queryInterface.sequelize.config.database);
      return this.queryInterface;
    };
    return model as any as T;
  }

  /** Specify sequelize hooks to apply to clients. Updates all existing clients and will be registered on future **/
  public registerHook<K extends keyof SequelizeHooks>(hookType: K, fn: SequelizeHooks[K]) {
    return this.connectionManager.registerHook(hookType, fn);
  }

  /**
   * Specify default db connection to be used for any subsequent operations
   * Called in middleware to ensure client ready when time to process request synchronously
   * */
  async ensureDeploymentClient(dbName: string) {
    // Create new client for custom db connection
    if (!this.connectionManager.userClients[dbName]) {
      await this.connectionManager.setupConnection(dbName);
    }
  }
}
