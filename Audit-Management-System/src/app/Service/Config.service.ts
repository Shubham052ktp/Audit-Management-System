import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserData } from '../Model/userdata';
import { QuestionList } from '../Model/QuestionList';
import { AuditType } from '../Model/AuditType';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  //private baseURL = environment.shareBaseURL
  
  constructor(private httpClient: HttpClient) { }
  
  
  loginUser(data: UserData): Observable<any>{
    const loginURL = `${environment.loginBaseURL}`
    return this.httpClient.post(loginURL, data);
    
  }

  getChecklist( auditType: String ): Observable<QuestionList>{
    let auditObj:any={
      'auditType':localStorage.getItem('AuditType')
    }
    
    const getQuestionURL= `${environment.getChecklistURL}`
    const header={
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Access-Control-Allow-Origin':'*'
    }
    return this.httpClient.post<QuestionList>(getQuestionURL,auditObj,{
      headers:header});
  }

  saveResponses( newData: any): Observable<QuestionList>{
    
    const saveResponseURL= `${environment.saveResponsesURL}`
    const header={
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Access-Control-Allow-Origin':'*'
    }
    return this.httpClient.post<QuestionList>(saveResponseURL,newData,{
      headers:header});
  }

}
