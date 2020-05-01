import { Injectable } from '@angular/core';
import {from} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  anonymousLogin() {
    return from(firebase.auth().signInAnonymously());
  }
}
