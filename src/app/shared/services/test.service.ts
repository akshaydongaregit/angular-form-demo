import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Answer } from '../models/answer';
import { Result } from '../models/result';
import { Template} from '../models/template';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  _state:any = {};

  public get state() { return this._state };
  
  constructor(private http:HttpClient) { }

  getQuestions():any {
    
    let questionDetails = {
      timeLimit : 60,
      questions:[
        {
          questionId : 1,
          question:'Where do you prefer to go in summer vacations, Please choose any one from below?',
          options:[
            { optionId: 1, text:'Your uncles village.' , image : 'abc' } ,
            { optionId: 2, text:'Would visit beaches, forests, animal parks etc.' },
            { optionId: 3, text:'You would prefer to stay home.'  },
            { optionId: 4, text:'You would prefer to go on trekking.' , image : 'abc'},
            { optionId: 5, text:'You would like to visit other country.' },
          ],
          solved:false,
          selectedOption:0
        },
        {
          questionId : 2,
          question:'Where do you prefer to go in summer vacations, Please choose any one from below? 2',
          options:[
            { optionId: 1, text:'Your uncles village. 2' } ,
            { optionId: 2, text:'Would visit beaches, forests, animal parks etc. 2' },
            { optionId: 3, text:'You would prefer to stay home. 2'  },
            { optionId: 4, text:'You would prefer to go on trekking. 2' },
            { optionId: 5, text:'You would like to visit other country. 2' },
          ],
          solved:false,
          selectedOption:0
        },
        {
          questionId : 3,
          question:'Where do you prefer to go in summer vacations, Please choose any one from below? 3',
          options:[
            { optionId: 1, text:'Your uncles village. 3' } ,
            { optionId: 2, text:'Would visit beaches, forests, animal parks etc. 3' },
            { optionId: 3, text:'You would prefer to stay home.'  },
            { optionId: 4, text:'You would prefer to go on trekking.' },
            { optionId: 5, text:'You would like to visit other country.' },
          ],
          solved:false,
          selectedOption:0
        }
      ]
    };

    return questionDetails;
  }

  getTemplateDetails(templateName:string):Observable<Template> {
    return this.http.get<Template>(`${environment.apiEndpoint}/getTemplateDetails?name=${templateName}`);
  } 

  getTemplateDetailsByUserId(userId:number):Observable<Template> {
    return this.http.get<Template>(`${environment.apiEndpoint}/getTemplateDetailsByUserId?user_id=${userId}`);
  }

  startTest(answer:Answer):Observable<Answer> {
    return this.http.post<Answer>(environment.apiEndpoint+'/beginTest',answer);
  }
  
  saveAnswer(answer:Answer):Observable<Answer> {
    console.log('putting ... ' + JSON.stringify(answer));
    return this.http.put<Answer>(environment.apiEndpoint+'/saveAnswer',answer);
  }

  submitTest(result:Result):Observable<Result> {
    return this.http.post<Result>(environment.apiEndpoint+'/result',result);
  }

  checkTestGiven(userId:number):Observable<boolean> {
    return this.http.get<boolean>(environment.apiEndpoint+'/isTestActive/'+userId);
  }

}
