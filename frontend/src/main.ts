import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/services/auth.interceptor';

console.log('=== ANGULAR APP BOOTSTRAPPING ===');
console.log('Current URL:', window.location.href);
console.log('Current path:', window.location.pathname);
console.log('Current search:', window.location.search);

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule,
      ReactiveFormsModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
}).then(() => {
  console.log('=== ANGULAR APP BOOTSTRAPPED SUCCESSFULLY ===');
}).catch(err => {
  console.error('=== ANGULAR APP BOOTSTRAP FAILED ===', err);
});
