import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  username;
  email;
  password;
  userRole;
  msg: any;
  users: object;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  // Validation Function
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  //Form controls
  get formControls() {
    return this.loginForm.controls;
  }
  //Function for login
  login() {
    this.isSubmitted = true;
    this.username = this.loginForm.value.username;
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    if (this.loginForm.invalid) {
      return;
    } else {
      // Login Validation
      this.authService.getusers().subscribe((data: any) => {
        this.users = data;
        for (var val of data) {
          if (
            val['username'] == this.username &&
            val['email'] == this.email &&
            val['password'] == this.password
          ) {
            this.authService.login(this.loginForm.value);
            if (val['userRole'] == 'Admin') {
              localStorage.setItem('username', this.username);
              this.router.navigateByUrl('/add');
              console.log('loged before ', this.authService.loged);

              this.authService.loged = true;
            }
            if (val['userRole'] == 'Candidate') {
              localStorage.setItem('username', this.username);
              this.router.navigateByUrl('/candidate');
            }
          } else {
            this.msg = 'Invalid Credentials';
          }
        }
      });
    }
  }
}
