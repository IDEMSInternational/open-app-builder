import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  @Output()
  onOptionSelect: EventEmitter<ChatResponseOption> = new EventEmitter();

  useModal = false;

  constructor(private modalController: ModalController, private localStorageService: LocalStorageService) {
    this.useModal = this.localStorageService.getBoolean("chat_responses_use_modal");
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("on changes ", changes);
    if (this.useModal && changes.responseOptions && changes.responseOptions.currentValue
      && changes.responseOptions.currentValue.length > 0) {
      this.modalController.create({
        component: ResponsesModalComponent,
        componentProps: {
          responseOptions: this.responseOptions,
          onOptionSelect: this.onOptionSelect
        },
        cssClass: "slide-up-modal",
        backdropDismiss: false,
        swipeToClose: false
      }).then((modal) => modal.present());
    }
  }

  selectResponseOption(option: ChatResponseOption) {
    this.onOptionSelect.emit(option);
  }

}
