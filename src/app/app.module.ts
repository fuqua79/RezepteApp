import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {RezeptComponent} from './rezept-detail/rezept-detail.component';
import {RezeptListeComponent} from './rezept-liste/rezept-liste.component';
import {RezeptErfassenComponent} from './rezept-erfassen/rezept-erfassen.component';
import {RezeptHomeComponent} from './rezept-home/rezept-home.component';
import {HttpModule} from "@angular/http";

import {NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import {IAppState, INITIAL_STATE, rootReducer} from "./common/redux/store";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
  {path: 'rezeptliste', component: RezeptListeComponent, data: {title: 'Rezeptliste -  Titel'}},
  {path: 'rezept/:id', component: RezeptComponent, data: {title: 'Rezept -  Titel'}},
  {path: 'rezepteerfassen', component: RezeptErfassenComponent, data: {title: 'Rezept Erfassen -  Titel'}},
  {path: 'rezepteerfassen/:id', component: RezeptErfassenComponent, data: {title: 'Rezept Erfassen -  Titel2'}},
  {path: 'home', component: RezeptHomeComponent, data: {title: 'HOME -  Titel'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'}, // empty path is the default path
  {path: '**', component: PageNotFoundComponent, data: {title: 'IRGENDWAS -  Titel'}}
];

@NgModule({
  declarations: [
    AppComponent,
    RezeptComponent,
    RezeptListeComponent,
    RezeptErfassenComponent,
    RezeptHomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {

    const storeEnhancers = devTools.isEnabled() ? [devTools.enhancer()] : [];

    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], storeEnhancers);

  }
}
