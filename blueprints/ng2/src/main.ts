import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './app/environment';

if( environment.production ) {
  enableProdMode();
}
browserDynamicPlatform().bootstrapModule(AppModule);
