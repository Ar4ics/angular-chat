import { User } from '../../core/auth/user';

export interface IMessage {
  $key?: string;
  uid: string;
  user?: User;
  createdAt: Object;
  content: string;
}
