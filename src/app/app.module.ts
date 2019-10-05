import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './component/header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptor} from './auth/auth-interceptor';
import {ErrorComponent} from './error/error.component';
import {ErrorInterceptor} from './error-interceptor';
import {AngularMaterialModule} from './angular-material.module';
import {RezeptModule} from './rezept.module';
import { ConfirmationDialogComponent } from './container/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    RezeptModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, ConfirmationDialogComponent]
})
export class AppModule {
}
