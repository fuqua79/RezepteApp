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
import {ConfirmationDialogComponent} from './container/confirmation-dialog/confirmation-dialog.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './state/state';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './state/auth/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { FooterComponent } from './component/footer/footer.component';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ConfirmationDialogComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    RezeptModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, ConfirmationDialogComponent]
})
export class AppModule {
  constructor( faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIconPacks(far);
    faIconLibrary.addIconPacks(fas);
    // faIconLibrary.addIcons(faClock);
  }
}
