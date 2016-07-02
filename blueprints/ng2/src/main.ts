import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environment';

if( environment.production ) {
  enableProdMode();
}

bootstrap(AppComponent);
