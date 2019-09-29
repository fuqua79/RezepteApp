import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatProgressSpinnerModule, MatRadioModule,
  MatTooltipModule
} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RezeptComponent} from './component/rezept-detail/rezept-detail.component';
import {RezeptListeComponent} from './component/rezept-liste/rezept-liste.component';
import {RezeptErfassenComponent} from './component/rezept-erfassen/rezept-erfassen.component';

import {RezeptHomeComponent} from './component/rezept-home/rezept-home.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './component/header/header.component';
import {RezeptDetailContainerComponent} from './container/rezept-detail-container/rezept-detail-container.component';
import {RezeptHomeContainerComponent} from './container/rezept-home-container/rezept-home-container.component';
import {RezeptListContainerComponent} from './container/rezept-list-container/rezept-list-container.component';
import {RezeptErfassenContainerComponent} from './container/rezept-erfassen-container/rezept-erfassen-container.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import {ErrorComponent} from './error/error.component';
import {ErrorInterceptor} from './error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    SignupComponent,
    RezeptComponent,
    RezeptListeComponent,
    RezeptErfassenComponent,
    RezeptHomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    RezeptDetailContainerComponent,
    RezeptHomeContainerComponent,
    RezeptListContainerComponent,
    RezeptErfassenContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {
}
