import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database';
import { IMessage } from '../message/imessage';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent implements OnInit {

  constructor(public ms: MessageService, public auth: AuthService) {}

  ngOnInit(): void {
  }
}
