import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //jwt token
  token: string | null = ""
 
  mainGroup= new FormGroup({
    projectName: new FormControl(''),
    projectManager: new FormControl(''),
    AppOwnerName: new FormControl(''),
    auditType: new FormControl('')
  });

  constructor(private activatedRoute: ActivatedRoute,private _router: Router) { }

  ngOnInit(): void {
    //to get the token
    this.token=localStorage.getItem('token')

  }
  getQuestion(val:any){
    console.log(val);
    console.log(val.auditType);
    localStorage.setItem('AuditType',val.auditType)

  if(this.token != null)
  {
    this._router.navigate(['questions'])
    
  }
    
  }

}
