import {NgModule} from '@angular/core';
import {RezeptComponent} from './component/rezept-detail/rezept-detail.component';
import {RezeptListeComponent} from './component/rezept-liste/rezept-liste.component';
import {RezeptErfassenComponent} from './component/rezept-erfassen/rezept-erfassen.component';
import {RezeptHomeComponent} from './component/rezept-home/rezept-home.component';
import {RezeptDetailContainerComponent} from './container/rezept-detail-container/rezept-detail-container.component';
import {RezeptHomeContainerComponent} from './container/rezept-home-container/rezept-home-container.component';
import {RezeptListContainerComponent} from './container/rezept-list-container/rezept-list-container.component';
import {RezeptErfassenContainerComponent} from './container/rezept-erfassen-container/rezept-erfassen-container.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {ClickStopPropagationDirective} from './helper/click-stop-propagation.directive';

@NgModule({
  declarations: [
    RezeptComponent,
    RezeptListeComponent,
    RezeptErfassenComponent,
    RezeptHomeComponent,
    RezeptDetailContainerComponent,
    RezeptHomeContainerComponent,
    RezeptListContainerComponent,
    RezeptErfassenContainerComponent,
    ClickStopPropagationDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ]
})

export class RezeptModule {
}
