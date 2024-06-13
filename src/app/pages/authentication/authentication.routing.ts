import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'forgetPassword',
        component: ForgetPassComponent,
      },
      {
        path: 'resetPassword',
        component: ResetPassComponent,
      },
    ],
  },
];
