import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { MainComponent } from './MyComponents/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { InternalQuestionsComponent } from './MyComponents/internal-questions/internal-questions.component';
//import { SOXQuestionsComponent } from './MyComponents/sox-questions/sox-questions.component';
import { QuestionComponent } from './MyComponents/question/question.component';
//import { ResultComponent } from './Mycomponents/result/result.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatRadioModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
