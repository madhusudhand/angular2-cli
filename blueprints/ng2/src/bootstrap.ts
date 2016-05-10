import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './shared/app.component/app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
// import {enableProdMode} from 'angular2/core';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS
]);

// enableProdMode();
