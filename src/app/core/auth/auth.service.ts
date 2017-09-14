import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './user';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
  authenticated$: Observable<boolean>;
  userUid: string;
  userPath: string;

  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public router: Router
  ) {
    this.authenticated$ = af.authState.map(user => !!user);
    af.authState.subscribe(user => {
      console.log('changed user');
      if (!user) {
        router.navigate(['user/login']);
      } else {
        this.userUid = user.uid;
        this.userPath = `users/${this.userUid}`;
      }
    });
  }

  getUserData() {
    return this.db.object(this.userPath);
  }

  signUp(user: User) {
    this.af.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((u: firebase.User) => {
        this.updateUserData({
          name: user.name,
          photo:
            'https://hsto.org/files/606/a66/4a3/606a664a3a0145b3bf86acce28acdb16.png'
        }, `users/${u.uid}`);
        this.postSignIn();
      })
      .catch(error => console.log('ERROR @ AuthService#signUp() :', error));
  }

  signIn(user: User) {
    this.af.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => this.postSignIn())
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  updateUserData(newUser: User, path = this.userPath): firebase.Promise<any> {
    return this.db.object(path).update(newUser);
  }

  signOut() {
    this.af.auth.signOut().then(() => {
       this.router.navigate(['user/login']);
    });
  }

  postSignIn(): void {
    this.router.navigate(['home']);
  }
}
