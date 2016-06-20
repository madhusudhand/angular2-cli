import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';

// @if ENV='prod'
  import { enableProdMode } from '@angular/core';
  enableProdMode();
// @endif

bootstrap(AppComponent);
