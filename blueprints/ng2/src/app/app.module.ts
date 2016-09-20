import { NgModule }       from '@angular/core';
import { HttpModule }     from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {
  AppComponent,
  appRoutes,
  appRouteProviders
} from './';
import { HomeComponent }  from './home/home.component';
import { HeaderComponent } from './home/header.component';
import { LoginModule }    from './login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    appRoutes,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
  ],
  providers: [
    appRouteProviders,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
