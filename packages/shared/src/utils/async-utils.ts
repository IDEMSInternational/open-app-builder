/** helper function used for dev to wait a fixed amount of time */
export function _wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/**
 * Utility to allow calling a function with a debouncer, as a more
 * generic alternate to rxjs debounce (for use in signals)
 * @example
 *
 * private inputDebouncer = new Debouncer(500)
 *
 * public handleInput(v){
 *   this.inputDebouncer.run(async()=>this.someSideEffect(v))
 * }
 */
export class Debouncer {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private pendingFn: (() => Promise<void>) | null = null;

  constructor(private readonly ms: number) {}

  /** Schedule `fn`, replacing any pending call */
  run(fn: () => Promise<void>) {
    this.cancel();
    this.pendingFn = fn;
    this.timer = setTimeout(() => {
      this.timer = null;
      this.pendingFn = null;
      fn();
    }, this.ms);
  }

  /** Execute any pending call immediately */
  async flush() {
    if (this.pendingFn) {
      const fn = this.pendingFn;
      this.cancel();
      await fn();
    }
  }

  /** Cancel without executing */
  cancel() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
      this.pendingFn = null;
    }
  }

  get pending() {
    return this.timer !== null;
  }
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
