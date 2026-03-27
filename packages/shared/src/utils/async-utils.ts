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
