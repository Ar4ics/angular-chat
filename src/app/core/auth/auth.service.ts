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

  signUp(user: User): firebase.Promise<any> {
    return this.af.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .catch(error => console.log('ERROR @ AuthService#signUp() :', error));
  }

  signIn(user: User): firebase.Promise<any> {
    return this.af.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  updateUserData(newUser: User): firebase.Promise<any> {
    return this.db.object(this.userPath).update(newUser);
  }

  signOut(): firebase.Promise<any> {
    return this.af.auth.signOut();
  }
}
