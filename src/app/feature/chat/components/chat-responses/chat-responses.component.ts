import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsService } from 'src/app/pages/settings/settings.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { ChatMessage, ChatResponseOption } from '../../models';
import { ResponsesModalComponent } from './responses-modal/responses-modal.component';

@Component({
  selector: 'plh-chat-responses',
  templateUrl: './chat-responses.component.html',
  styleUrls: ['./chat-responses.component.scss'],
})
export class ChatResponsesComponent implements OnChanges {

  @Input()
  responseOptions: ChatResponseOption[];

  @Input()
  message: ChatMessage;

  ticked: boolean = true;

  @Output()
  onOptionSelect: EventEmitter<ChatResponseOption> = new EventEmitter();

  useModal = false;

  constructor(private modalController: ModalController, private settingsService: SettingsService) {
    this.settingsService.getUserSetting("USE_MODAL_FOR_CHAT_RESPONSES").subscribe((useModal) => {
      this.useModal = useModal === "true"
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.useModal && changes.responseOptions && changes.responseOptions.currentValue
      && changes.responseOptions.currentValue.length > 0) {
      this.modalController.create({
        component: ResponsesModalComponent,
        componentProps: {
          responseOptions: this.responseOptions,
          message: this.message,
          onOptionSelect: this.onOptionSelect
        },
        cssClass: "slide-up-modal",
        backdropDismiss: false,
        swipeToClose: false
      }).then((modal) => modal.present());
    }
    if (changes.message.currentValue !== changes.message.previousValue) {
      if (!this.message.tickedByDefault) {
        this.ticked = false;
      } else {
        this.ticked = true;
      }
    }
  }

  selectResponseOption(option: ChatResponseOption) {
    this.onOptionSelect.emit(option);
  }

  getResponseOptions() {
    if (this.message && this.message.displayAsTick && this.message.responseOptions.length >= 2) {
      if (this.ticked) {
        return [this.message.responseOptions[0]];
      } else {
        return [this.message.responseOptions[1]];
      }
    } else {
      return this.message.responseOptions;
    }
  }

}
