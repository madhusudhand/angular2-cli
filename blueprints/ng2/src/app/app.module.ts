import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {
  AppComponent,
  appRoutes,
  appRouteProviders
} from './';
import { HomeComponent }    from './home/home.component';
// module imports
import { LoginModule } from './login/login.module';

// import { HttpClient } from './common/HttpClient';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    appRoutes,
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    appRouteProviders,
    // HttpClient
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
