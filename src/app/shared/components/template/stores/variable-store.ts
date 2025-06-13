import { BehaviorSubject, Observable } from "rxjs";

export class VariableStore {
  private readonly state: { [key: string]: BehaviorSubject<any> } = {};

  constructor() {}

  public setVariable(name: string, value: any): void {
    if (!this.state[name]) {
      this.state[name] = new BehaviorSubject<any>(value);
    } else {
      this.state[name].next(value);
    }
  }

  public getVariable(name: string): any {
    if (!this.state[name]) {
      return undefined;
    }
    return this.state[name].value;
  }

  public watchVariable(name: string): Observable<any> {
    if (!this.state[name]) {
      this.state[name] = new BehaviorSubject<any>(undefined);
    }
    return this.state[name].asObservable();
  }

  public hasVariable(name: string): boolean {
    return this.state.hasOwnProperty(name);
  }

  public getAllVariables(): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    Object.keys(this.state).forEach((key) => {
      result[key] = this.state[key].value;
    });
    return result;
  }

  public clear(): void {
    Object.keys(this.state).forEach((key) => {
      this.state[key].complete();
    });
    Object.keys(this.state).forEach((key) => {
      delete this.state[key];
    });
  }
}
