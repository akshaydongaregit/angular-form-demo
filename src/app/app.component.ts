import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { SessionService } from '../app/shared/services/session.service';
import { strict } from 'assert';
import { stringify } from 'querystring';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'smart-champs';
  currentURL: string = "";
  check: string;
  isLogedIn: boolean;
  showHomePage: boolean = true;
 

  constructor(private router: Router, private session: SessionService) {

    this.check = localStorage.getItem("loginStatus");

    if (this.check == "1") {
      this.isLogedIn = true;
    }
    else {
      this.isLogedIn = false;
    }

  }

  LoginStatus$: Observable<boolean>;



  public ngOnInit() {
    this.LoginStatus$ = this.session.isLoggesIn;
    this.check = JSON.stringify(localStorage.getItem("loginStatus"));
    
    var atoString =  window.location;   
    var token = atoString.toString().split("token=")[1];
    var finalToken = token.toString().split("%")[0] + "=";
    
    if( token != undefined)
    {
      localStorage.setItem('token', finalToken);
      this.router.navigate(["/auth/reset"]);
    }
    
   //Swal.fire("This site is under construction..Some functionalities maynot be available!!"); 
  }

}
