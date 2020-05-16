import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any;
  username: any;
  currentDate = new Date();
  emailLogin = false;
  emailSignUp = false;
  googleLogin = false;
  match = false;
  addSuccess = false;
  confirmPass = '';
  message = '';
  messageType = '';
  emailForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required,
      Validators.pattern('^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\\d\\W])|(?=.*\\W)(?=.*\\d))|(?=.*\\W)(?=.*[A-Z])(?=.*\\d)).{8,}$')]],
    dob: [this.currentDate],
    org: ['', [Validators.required, Validators.minLength(2)]],
  });
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.pattern('')]],
  });
  googleForm: FormGroup = this.formBuilder.group({
    dob: [this.currentDate],
    org: ['', [Validators.required, Validators.minLength(2)]],
  });


  constructor(private firebase: FirebaseService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firebase.checkUser().subscribe(res => {
      if (res !== null) {
        this.firebase.findUser(res.email).subscribe(ret => {
          this.user = ret.docs[0].data();
          this.username = this.user.displayName;
        });
      }
    });
  }

  google() {
    this.firebase.googleLogin().subscribe(res => {
      this.user = res.user;
      this.username = this.user.displayName;
      this.firebase.findUser(this.user.email).subscribe(ret => {
        this.googleLogin = ret.empty;
      }, err => {
        this.message = err.message;
        this.messageType = 'error';
        this.googleLogin = false;
      });
    });
  }

  googleCreate() {
    const newUser = {
      displayName: this.user.displayName,
      email: this.user.email,
      dob: this.googleForm.value.dob,
      org: this.googleForm.value.org
    };
    this.firebase.addUser(newUser).subscribe(res => {
      this.addSuccess = true;
    }, err => {
      this.message = err.message;
      this.messageType = 'error';
    });
  }

  logout() {
    this.firebase.logout().subscribe(res => {
      this.user = null;
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.firebase.emailLogin(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        this.firebase.findUser(res.user.email).subscribe(ret => {
          this.user = ret.docs[0].data();
          this.username = this.user.displayName;
        });
        this.message = 'Successfully signed in';
        this.messageType = 'success';
      }, err => {
        this.message = err.message;
        if (this.message === '' || this.message === null || this.message === undefined) {
          this.message = 'Could not complete sign in.';
        }
        this.messageType = 'error';
      });
    }
  }

  createEmail() {
    if (this.emailForm.valid) {
      this.firebase.emailRegister(this.emailForm.value.email, this.emailForm.value.password).subscribe(res => {
        this.user = res.user;
        this.username = this.user.name;
        this.message = 'Successfully signed in';
        this.messageType = 'success';
        const newUser = {
          displayName: this.emailForm.value.name,
          email: this.user.email,
          dob: this.emailForm.value.dob,
          org: this.emailForm.value.org
        };
        this.firebase.addUser(newUser).subscribe(ret => {
          console.log('User added.');
        });
      }, err => {
        this.message = err.message;
        if (this.message === '' || this.message === null || this.message === undefined) {
          this.message = 'Could not complete sign in.';
        }
        this.messageType = 'error';
      });
    }
  }

  checkPass() {
    this.match = this.confirmPass === this.emailForm.value.password;
  }

  getDate(event) {
    const date = new Date(event.target.value).toISOString().substring(0, 10);
    this.emailForm.get('dob').setValue(date, {
      onlyself: true
    });
  }

  reset() {
    this.emailForm.reset();
    this.loginForm.reset();
    this.googleForm.reset();
    this.match = false;
    this.confirmPass = '';
    this.emailLogin = false;
    this.emailSignUp = false;
    this.googleLogin = false;
    this.addSuccess = false;
    this.message = '';
    this.messageType = '';
  }
}
