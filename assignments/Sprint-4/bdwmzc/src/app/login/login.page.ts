import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;
  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
  }

  anon() {
    this.firebase.anonymousLogin().subscribe(res => {
      this.user = res.user;
      debugger;
    });
  }
}
