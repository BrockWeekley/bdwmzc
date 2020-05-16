import { Injectable } from '@angular/core';
import {from} from 'rxjs';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fba: AngularFireAuth, private afs: AngularFirestore) { }

  emailRegister(email, password) {
    return from(this.fba.createUserWithEmailAndPassword(email, password));
  }

  emailLogin(email, password) {
    return from(this.fba.signInWithEmailAndPassword(email, password));
  }

  googleLogin() {
    return from(this.fba.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  addUser(user) {
    return from(this.afs.collection('users').add(user));
  }

  findUser(email) {
    return this.afs.collection('users', ref =>
        ref.where('email', '==', email)
    ).get();
  }

  // updateUser(user, id) {
  //   return this.afs.collection('users').doc(id).update(user);
  // }

  doLogout() {
    return this.fba.signOut();
  }

  checkUser() {
    return this.fba.user;
  }

  logout() {
    return from(this.fba.signOut());
  }

  getAllUsers() {
    return from(this.afs.collection('users').get());
  }
}
