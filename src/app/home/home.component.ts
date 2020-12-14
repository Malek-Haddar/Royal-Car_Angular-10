import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  email: string;
  contactOn: boolean = false;
  merci: boolean = false;
  Name: string = '';

  constructor(public authservice: AuthService) {}

  ngOnInit(): void {}

  contact() {
    if (this.contactOn) this.contactOn = false;
    else this.contactOn = true;
  }
  getName(val: any) {
    this.Name = val;
    this.contactOn = false;
  }
}
