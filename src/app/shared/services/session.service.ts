import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router,private http: HttpClient) { }
  // User related properties
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));
  private UserType = new BehaviorSubject<string>(localStorage.getItem('userType'));
  private UserId = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('userId')));

  checkLoginStatus(): boolean {
    var loginCookie = localStorage.getItem("loginStatus");
    if (loginCookie == "1") {
      return true;
    }
    return false;
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  get currentUserType() {
    return this.UserType.asObservable();
  }

  get currentUserId() {
    return this.UserId.asObservable();
  }

  state(app_state) {
    if (app_state) {
      localStorage.setItem('app_state', JSON.stringify(app_state));
    }
    else {
      return JSON.parse(localStorage.getItem('app_state'));
    }
  }

  logout() {
    Swal.fire("You have successfully logged out");
    this.loginStatus.next(false);
    localStorage.setItem('loginStatus', '0');
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userObj');
    localStorage.removeItem('app_state');
    this.http.get(environment.apiEndpoint+"/logout");
    this.router.navigate(["/home"]);

  }

  setuser(data) {
    this.loginStatus.next(true);
    let userObj = {
      firstname : data.firstName,
      name: data.firstName + " " + data.lastName,
      address: data.city + ", " + data.state + ", " + data.country,
      email: data.email,
      phone: data.phoneNo,
      birthday: data.birthdate,
    }
    localStorage.setItem('userObj', JSON.stringify(userObj));
    localStorage.setItem('loginStatus', '1');
    localStorage.setItem('username', data.username);
    localStorage.setItem('userType', data.userType);
    localStorage.setItem('userId', JSON.stringify(data.userId));
    this.UserName.next(localStorage.getItem('username'));
    this.UserType.next(localStorage.getItem('userType'));
    this.UserId.next(JSON.parse(localStorage.getItem('userId')));
  }
}


