import 'es6-shim/es6-shim';
import 'zone.js/dist/zone';
import 'reflect-metadata';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './app/environment';

if( environment.production ) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
