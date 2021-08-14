import { Component, OnInit, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Service/Config.service';
import { QuestionList } from 'src/app/Model/QuestionList';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionList:any=[]
  newdata:any =[]
  pageError: string = ""
  token:any |null=[]
  auditType:any |null=[]
  arry:any=[]

  questionGroup=new FormGroup({
    response1: new FormControl(''),
    response2: new FormControl(''),
    response3: new FormControl(''),
    response4: new FormControl(''),
    response5: new FormControl('')
  });



  constructor(private activatedRoute: ActivatedRoute,private _router: Router, private configService: ConfigService) {
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('AuditType'));
    


    
  }
  
  ngOnInit(): void
  {
    this.token=JSON.parse(JSON.stringify(localStorage.getItem('token')))
    this.auditType=JSON.parse(JSON.stringify(localStorage.getItem('AuditType')))


    if(this.token != null)
    {
    this.configService.getChecklist(this.auditType).subscribe(data=> {
      this.newdata=data;
      console.log(this.newdata);
      });
    }

  
  }

  getResponse(res:any)
  {
    console.log(this.newdata[0].response);
    this.newdata[0].response=res.response1;
    this.newdata[1].response=res.response2;
    this.newdata[2].response=res.response3;
    this.newdata[3].response=res.response4;
    this.newdata[4].response=res.response5;
    if(this.token != null){
      this.configService.saveResponses(this.newdata).subscribe(data=>{
        this.arry=data;
        console.log("Updated..");
        console.log(this.arry);
      });
    }
    this._router.navigate(['confirmStatus'])
  }
 
 
  


}
