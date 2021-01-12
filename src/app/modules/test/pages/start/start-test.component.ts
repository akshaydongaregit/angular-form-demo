import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/shared/services/test.service';
import { Template } from 'src/app/shared/models/template';
import { Answer } from 'src/app/shared/models/answer';
import * as $ from 'jquery';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { Session } from 'inspector';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})
export class StartTestComponent implements OnInit {

  templateName:string='';
  template:Template;
  userId:number;
  isActiveTest : boolean;
  constructor(private ts:TestService, private router:Router, private session: SessionService) { }

  ngOnInit(): void {


    this.session.currentUserId.subscribe(val =>{  
      this.ts.checkTestGiven(val).subscribe((res) => {
        //alert("res"+res);
        this.isActiveTest = res;
        if(this.isActiveTest){
        //alert("hhh");
            this.userId=val;
            this.ts.getTemplateDetailsByUserId(val).subscribe((template:Template) => {
              let state:any ={};
              state.template = template;
              this.session.state(state);
              this.template = template;
              //console.log(`userId:${val} template:${JSON.stringify(template)}`);
            });
        
        }

      });
    });
    
    
    
  }

  startTest() {
   
    let answer = new Answer();
    answer.templateId = this.template.templateId;
    answer.userId = this.userId;
    
    this.ts.startTest(answer).subscribe((answer:Answer) => {
      
      let state=this.session.state(undefined);
      state.answer = answer;
      this.session.state(state);
      this.router.navigate(['/test/give']);
    } , (err) => {
      Swal.fire("Error while starting test. Please try again.");
    });
    
  }
}
