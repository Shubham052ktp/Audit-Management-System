import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponents/login/login.component';
import { MainComponent } from './MyComponents/main/main.component';
import { QuestionComponent } from './MyComponents/question/question.component';
import { ConfirmStatusComponent } from './MyComponents/confirm-status/confirm-status.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'questions', component: QuestionComponent},
  {path: 'confirmStatus', component: ConfirmStatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents= [LoginComponent,MainComponent,QuestionComponent,ConfirmStatusComponent]