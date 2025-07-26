import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';

import { AppModule } from './app/app.module';

// Türkçe locale'i register et
registerLocaleData(localeTr, 'tr');

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
