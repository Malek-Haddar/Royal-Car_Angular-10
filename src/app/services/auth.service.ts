import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loged : boolean = false
  constructor(private httpClient: HttpClient, private router: Router) {}
  public login(userInfo: User) {
    localStorage.setItem('ACCESS_TOKEN', 'access_token');
  }
  // Return to login page
  public isLoggedIn() {
    if (localStorage.getItem('username') == null) {
      this.router.navigateByUrl('/login');
    }
    return localStorage.getItem('username') !== null;
  }
  // Logout
  public logout() {
    localStorage.removeItem('username');
  }
  // Authentication
  getusers() {
    return this.httpClient.get('http://localhost:3000/users');
  }
}
