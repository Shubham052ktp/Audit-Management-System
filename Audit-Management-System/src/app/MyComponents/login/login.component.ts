import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Service/Config.service';
import { UserData } from 'src/app/Model/userdata';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({});
  public errorMessage = '';
  //shareDetailsService!: ShareDetailsService;
  constructor(private _loginFormBuilder: FormBuilder, 
    private configService: ConfigService,
    private _router: Router){

      console.log("===================================>"+this.configService);
    }

  ngOnInit(): void {
    this.loginForm = this._loginFormBuilder.group(
      {
        userId: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }
  public loginUser(data: UserData) {
    console.log('from login comp ', data);
    
    this.configService.loginUser(data).subscribe( (response) => {
     console.log("hello access");
      console.log(response);
      localStorage.setItem('token',response.authToken);
      console.log(localStorage.getItem('token'));
      this.redirectToNext();
    }, (err) => {
      console.log('err', err);
      this.errorMessage = err.error.message;
    });
  }
  redirectToNext() {
    this._router.navigate(['main'])
  }
  }


