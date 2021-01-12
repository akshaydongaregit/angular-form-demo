import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Template } from '../models/template';
import { Remark } from '../models/remark';
import { Question } from '../models/question';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  template : Template;
  constructor(private http:HttpClient) { }

  saveStep(template:Template):Observable<Template> {
    return this.http.post<Template>(environment.apiEndpoint+'/template/s1',template);
  }
  saveStep1(template:Template):Observable<Template> {
    return this.http.post<Template>(environment.apiEndpoint+'/template/s1',template);
  }

  saveStep2(template:Template):Observable<Template> {
    return this.http.put<Template>(environment.apiEndpoint+'/template/s2',template);
  }

  saveStep3(template:Template):Observable<Template> {
    return this.http.put<Template>(environment.apiEndpoint+'/template/s3',template);
  }

  async saveStep4(questions:Question[]):Promise<boolean> {
    for(let i=0;i<questions.length;i++)
    {
      console.log("calling backend service for :"+(i+1)+"with input : "+questions[i]);
      let result = await this.http.post<Question>(environment.apiEndpoint+'/question/s4',questions[i]).toPromise();
    }
    return questions.length>0 ?true: false;
    
  }

  saveStep5(remarks:Remark[]):Observable<Remark[]> {
    return this.http.post<Remark[]>(environment.apiEndpoint+'/remark/s5',remarks);
  }

  get(data):Observable<any> {
    return this.http.post(environment.apiEndpoint+'/template/save-step',data);
  }

  saveStep6(template:Template):Observable<Template> {
    return this.http.put<Template>(environment.apiEndpoint+'/template/s6',template);
  }

  getAllTemplates():Observable<string[]> {
    return this.http.get<string[]>(environment.apiEndpoint+'/getAllTemplates');
  }

}
