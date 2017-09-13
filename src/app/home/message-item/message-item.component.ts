import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../message/imessage';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message: IMessage;
}
