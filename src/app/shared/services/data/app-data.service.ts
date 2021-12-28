import { Injectable } from "@angular/core";

/**
 * The data service has been through a couple iterations, currently the
 * main purpose is to re-export data from the data folder, but also has
 * a more general lookup which is used by task actions
 *
 */

@Injectable({ providedIn: "root" })
export class AppDataService {}

/**
 *
 * TODO - handle loading full set of data_lists for dynamic parser
 *
 **/
