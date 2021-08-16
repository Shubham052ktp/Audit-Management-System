import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Service/Config.service';

@Component({
  selector: 'app-confirm-status',
  templateUrl: './confirm-status.component.html',
  styleUrls: ['./confirm-status.component.css']
})
export class ConfirmStatusComponent implements OnInit {
  
  auditResult:any=[]

  constructor(private activatedRoute: ActivatedRoute,private _router: Router, private configService: ConfigService) { }

  ngOnInit(): void {
    let auditrequest:any={
      'projectName':localStorage.getItem('projectName'),
      'projectManagerName':localStorage.getItem('projectManager'),
      'applicationOwnerName':localStorage.getItem('ApplicationOwner'),
      'auditDetails':{
        'auditType':localStorage.getItem('AuditType'),
        'auditQuestions': JSON.parse(localStorage.getItem('res') || '{}')
      }
    }
    if(localStorage.getItem('token') != null){

      this.configService.auditSeverity(auditrequest).subscribe(data=>{
        this.auditResult=data;
        console.log(this.auditResult);


      });
    }
    
    
  }
  goToResult()
  {
  
    this._router.navigate(['main'])
    
  }

}
