import { Injectable } from '@angular/core';
import {from} from 'rxjs';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fba: AngularFireAuth) { }

  anonymousLogin() {
    return from(this.fba.signInAnonymously());
  }

  googleLogin() {
    return from(this.fba.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  logout() {
    return from(this.fba.signOut());
  }
}
