import { DatePipe } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.component';
import { AppComponent } from './app.component';
import { ErrorHandlerInteceptorService } from './interceptors/error-handler.interceptor.service';
import { ShelterInterceptorService } from './interceptors/shelter-interceptor.service';
import { TokenApiRestInterceptorService } from './interceptors/token-api-rest-interceptor.service';
import { AppInitService } from './services/app-init.service';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

export function appInit(appInitService: AppInitService): any {
  return () => appInitService.init();
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AppRoutingModule,
    MatDialogModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pl-PL',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInteceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenApiRestInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ShelterInterceptorService,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
registerLocaleData(localePl);
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
