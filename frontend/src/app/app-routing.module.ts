import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { MembersComponent } from './members/members.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuard } from './route.guard'

const routes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'members', component: MembersComponent, canActivate: [RouteGuard]},
  {path: 'register', component: RegisterComponent},
  
  // otherwise route to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ LoginFormComponent ]