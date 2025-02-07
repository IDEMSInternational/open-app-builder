import { LocalStorageService } from "./local-storage.service";

/**
 * Mock calls to localStorage service
 * The mock still requires window localstorage, but passes custom prefix to store mock values
 *
 * TODO - would be better to override window.localstorage methods however difficult to restore
 * after use (needs to be implemented in individual specs and not mock service)
 * */
export class MockLocalStorageService extends LocalStorageService {
  constructor(prefix = "mock") {
    super();
    this.prefix = prefix;
    this.clear();
  }
}
