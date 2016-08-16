import { NgModule } from '@angular/core';
import { LoginComponent, loginRoutes, loginRouteProviders } from './';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    loginRoutes
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    loginRouteProviders
  ]
})
export class LoginModule {}
