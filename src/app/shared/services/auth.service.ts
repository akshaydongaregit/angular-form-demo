import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Admin } from '../models/admin';
import { SuperAdmin} from '../models/super.admin';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //currentuser : User;
  //currentadmin : Admin[];
  //currentsuperadmin : SuperAdmin[];

  constructor(private http: HttpClient) { }



  doAuth(username, pswd): Observable<User> {

    return this.http.post<User>(environment.apiEndpoint + '/login', {
      userName: username,
      password: pswd
    });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(environment.apiEndpoint + '/register', user);
  }

  forgot(username, emailid): Observable<User> {

    return this.http.post<User>(environment.apiEndpoint + '/forgetPassword', {
      userName: username,
      emailId: emailid
    });
  }

  reset(token, password): Observable<User> {

    return this.http.post<User>(environment.apiEndpoint + '/resetPassword', {
      token :token,
      password: password
      });
  }

  
  passChange(userName, password, newPassword, userType): Observable<User> {

    return this.http.post<User>(environment.apiEndpoint + '/updatePassword', {
      newPassword : newPassword,
      userType : userType,
      userName: userName,
      password : password,
    });
  }

  createadmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(environment.apiEndpoint + '/registerAdmin', admin);
  }

  getUserDetails(userType:string, userId:number):Observable<User>{
    return this.http.get<User>(environment.apiEndpoint+"/getUserDetails/"+userType+"/"+userId);
  }
}
