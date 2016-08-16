import { Component, OnInit } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { HeaderComponent } from './home/header.component';
import { HomeComponent } from './home/home.component';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html',
    directives: [ HeaderComponent, HomeComponent ],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
