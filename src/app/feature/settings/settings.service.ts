import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { BASE_USER_SETTINGS, UserSetting, UserSettingId } from './user.settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private lsPrefix = "user_settings.";

  private userSettings$: BehaviorSubject<UserSetting[]>;

  constructor(private localStorageService: LocalStorageService) {
    const lsPopulatedSettings = BASE_USER_SETTINGS.map((setting) => {
      const lsValue = localStorageService.getString(this.lsPrefix + setting.id);
      return { ...setting, value: lsValue === null ? setting.value : lsValue };
    });
    this.userSettings$ = new BehaviorSubject(lsPopulatedSettings);
  }

  getAllUserSettings(): Observable<UserSetting[]> {
    return this.userSettings$.asObservable();
  }

  getUserSetting(id: UserSettingId): Observable<string> {
    return this.userSettings$.pipe(
      map((settings) => {
        const setting = settings.find((setting) => setting.id === id);
        return setting ? setting.value : undefined;
      }),
      filter((setting) => setting !== undefined)
    );
  }

  setUserSetting(id: UserSettingId, value: string) {
    this.localStorageService.setString(this.lsPrefix + id, value);
    const settings = this.userSettings$.getValue();
    const updatedSettings = settings.map((setting) => {
      if (setting.id === id) {
        return { ...setting, value: value };
      }
      return setting;
    });
    this.userSettings$.next(updatedSettings);
  }
}
