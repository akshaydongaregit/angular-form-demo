import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Admin } from '../models/admin';
import { SessionService } from '../services/session.service';
import { environment } from '../../../environments/environment';
import { Observable, empty } from 'rxjs';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  adminId : number;
  service : string;
  tempID : number;
  resultD : Result;
  

  constructor(private http: HttpClient, private session: SessionService) { 

    this.session.currentUserId.subscribe(val => {
      this.adminId = val;
      this.service = "/adminStudents/" + val;
    });
    
  }

  getAllAdmins():Observable<Admin[]> {
    return this.http.get<Admin[]>(environment.apiEndpoint+'/adminDetails');
  }

  getAllAdminsFilter(name):Observable<Admin[]> {
    if(name == empty)
    {
      return this.http.get<Admin[]>(environment.apiEndpoint+'/adminDetails');
    }
    else
    {
      return this.http.get<Admin[]>(environment.apiEndpoint+'/adminDetails?adminName='+name);
    }
  }

  getUsers():Observable<User[]> {
    //alert("service " + this.service);
    return this.http.get<User[]>(environment.apiEndpoint+this.service);
  }

  getUsersResult():Observable<Result[]> {
    //alert("service " + this.service);
    return this.http.get<Result[]>(environment.apiEndpoint+'/studentResultByAdmin?adminId='+this.adminId);
  }

  getGroupNames():Observable<string[]> {
    //alert("service " + this.service);
    this.tempID =  JSON.parse(localStorage.getItem('tempID')); 
    return this.http.get<string[]>(environment.apiEndpoint+'/getGroupNames?templateId='+this.tempID);
  }

  getUsersResultForSuperadmin():Observable<Result[]> {
    //alert("service " + this.service);
    return this.http.get<Result[]>(environment.apiEndpoint+'/result');
  }
  getUsersResultAnswerForSuperadmin():Observable<Result[]> {
    //alert("service " + this.service);
    this.tempID =  JSON.parse(localStorage.getItem('tempID'));
    this.resultD = JSON.parse(localStorage.getItem('resultArray')); 
    let groupid = 1;
    return this.http.get<Result[]>(environment.apiEndpoint+'/result/'+groupid+'/'+this.tempID+'/'+this.resultD.userId);
  }
}
