import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatResponseOption } from '../../../models/chat-msg.model';

@Component({
  selector: 'plh-responses-modal',
  templateUrl: './responses-modal.component.html',
  styleUrls: ['./responses-modal.component.scss'],
})
export class ResponsesModalComponent implements OnInit {

  @Input()
  responseOptions: ChatResponseOption[];

  @Output()
  onOptionSelect: EventEmitter<ChatResponseOption> = new EventEmitter();

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  selectResponseOption(option: ChatResponseOption) {
    this.onOptionSelect.emit(option);
    this.modalController.dismiss();
  }

}
