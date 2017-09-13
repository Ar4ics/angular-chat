import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    DoCheck,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { IMessage } from '../message/imessage';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnChanges, DoCheck {

  @Input() messages: FirebaseListObservable<IMessage[]>;

  ngDoCheck(): void {
    // console.log('do check');
    // const d = document.querySelector('.scrollable');
    // if (d) {
    //   d.scrollTop = d.scrollHeight;
    // }
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // const d = document.querySelector('.scrollable');
    // if (d) {
    //   d.scrollTop = d.scrollHeight;
    // }
  }
}
