import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserSetting } from '../user.settings.model';

@Component({
  selector: 'plh-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss'],
})
export class UserSettingComponent {

  @Input()
  userSetting: UserSetting;

  @Output()
  onSettingChange: EventEmitter<UserSetting> = new EventEmitter();

  constructor() { }

  toggleUserSetting(setting: UserSetting) {
    const bool = setting.value === "true";
    setting.value = "" + !bool;
    this.onSettingChange.emit(setting);
  }

  selectSettingOption(setting: UserSetting, value: string) {
    setting.value = value;
    this.onSettingChange.emit(setting);
  }

}
