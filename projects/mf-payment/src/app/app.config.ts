import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routesmfPayment } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routesmfPayment)]
};
