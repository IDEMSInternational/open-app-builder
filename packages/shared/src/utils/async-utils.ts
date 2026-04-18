/** helper function used for dev to wait a fixed amount of time */
export function _wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
// Type definitions for the Prioritized Task Scheduling API
interface SchedulerTaskOptions {
  priority?: "user-blocking" | "user-visible" | "background";
  delay?: number;
  signal?: AbortSignal;
}

interface Scheduler {
  postTask<T>(callback: () => T | Promise<T>, options?: SchedulerTaskOptions): Promise<T>;
}

// Augment the global Window object ONLY for the missing scheduler API
declare global {
  interface Window {
    scheduler?: Scheduler;
  }
}

/**
 * Schedules a low-priority task to run without blocking the main UI thread.
 * Uses modern window.scheduler when available, with graceful fallback to
 * requestIdleCallback and setTimeout
 *
 * @param task - The function to execute deferred. Can be sync or return a Promise.
 * @returns A Promise resolving to the exact type returned by the task.
 */
export function deferTask<T>(task: () => T | Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const execute = () => {
      try {
        const result = task();
        if (result instanceof Promise) {
          result.then(resolve).catch(reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    };

    // SSR Guard: Execute immediately on the server
    if (typeof globalThis === "undefined") {
      execute();
      return;
    }

    // 1. Modern API: The Prioritized Task Scheduling API
    if (globalThis.scheduler && typeof globalThis.scheduler.postTask === "function") {
      globalThis.scheduler.postTask(execute, { priority: "background" }).catch(reject);
      return;
    }

    // 2. Standard Fallback: requestIdleCallback
    if (typeof globalThis.requestIdleCallback === "function") {
      globalThis.requestIdleCallback(() => execute());
      return;
    }

    // 3. Legacy Fallback: setTimeout
    setTimeout(execute, 1);
  });
}
