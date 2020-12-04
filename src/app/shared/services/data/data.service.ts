export { completions as COMPLETIONS } from "src/data/completions";
export { conversation as CONVERSATION } from "src/data/conversation";
export { goals as GOALS } from "src/data/goals";
export { reminders as REMINDERS } from "src/data/reminders";
export { tasks as TASKS } from "src/data/tasks";
export { tips as TIPS } from "src/data/tips";

/**
 * The data service has been through a couple iterations, currently the
 * only purpose it serves is re-exporting data from the data folder,
 * but could be enhanced in the future.
 *
 * It is still preferable to import data from this service as opposed to
 * the data file folder, as we could use the service to also update
 * the data that is exported dynamically
 * (e.g. after loading from server json or alternate locations)
 */
