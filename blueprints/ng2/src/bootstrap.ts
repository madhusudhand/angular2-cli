import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './shared/app.component/app.component';

// @if ENV='prod'
  import { enableProdMode } from '@angular/core';
  enableProdMode();
// @endif

bootstrap(AppComponent);
