import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/modules/auth/login/login.component';
import { MainLoginComponent } from '@app/modules/auth/main-login/main-login.component';
import { RegisterComponent } from '@app/modules/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MainLoginComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
