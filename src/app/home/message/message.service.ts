import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Observable } from 'rxjs/Observable';
import { IMessage } from './imessage';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Message } from './message';
import { AuthService } from '../../core/auth/auth.service';

@Injectable()
export class MessageService {
  messages$: FirebaseListObservable<IMessage[]>;

  constructor(public auth: AuthService) {
    const path = `/messages`;
    this.messages$ = this.auth.db.list(path).switchMap(messages => {
      const userObservables = messages.map(message =>
        this.auth.db.object(`users/${message.uid}`)
      );
      return userObservables.length === 0
        ? Observable.of(messages)
        : Observable.combineLatest(...userObservables, (...users) => {
            messages.forEach((message, index) => {
              message.user = users[index];
              // console.log(message);
            });
            return messages;
          }).do(value => console.log(value));
    }) as FirebaseListObservable<IMessage[]>;
  }

  createMessage(content: string) {
    this.messages$.push(new Message(this.auth.userUid, content));
  }
}
