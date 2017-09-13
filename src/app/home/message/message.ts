import * as firebase from 'firebase/app';
import { IMessage } from './imessage';

export class Message implements IMessage {
  createdAt = firebase.database.ServerValue.TIMESTAMP;

  constructor(public uid: string, public content: string) {}
}
