import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatMessage, ChatResponseOption } from '../../models';

@Component({
  selector: 'plh-chat-responses',
  templateUrl: './chat-responses.component.html',
  styleUrls: ['./chat-responses.component.scss'],
})
export class ChatResponsesComponent implements OnInit {

  @Input()
  chatMessage: ChatMessage;

  @Output()
  onOptionSelect: EventEmitter<ChatResponseOption> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  selectResponseOption(option: ChatResponseOption) {
    this.onOptionSelect.emit(option);
  }

}
