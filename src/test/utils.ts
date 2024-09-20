import { defer } from "rxjs";

// Utils referenced in v17 angular docs, copied from
// https://stackblitz.com/edit/spec-has-no-expectations?file=src%2Ftesting%2Fasync-observable-helpers.ts

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

/**
 * Create async observable error that errors
 * after a JS engine turn
 */
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
