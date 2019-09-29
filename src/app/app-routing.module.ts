import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RezeptListContainerComponent} from './container/rezept-list-container/rezept-list-container.component';
import {RezeptDetailContainerComponent} from './container/rezept-detail-container/rezept-detail-container.component';
import {RezeptErfassenContainerComponent} from './container/rezept-erfassen-container/rezept-erfassen-container.component';
import {RezeptHomeContainerComponent} from './container/rezept-home-container/rezept-home-container.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {path: 'rezeptliste', component: RezeptListContainerComponent, data: {title: 'Rezeptliste -  Titel'}},
  {path: 'rezept/:id', component: RezeptDetailContainerComponent, data: {title: 'Rezept -  Titel'}},
  {
    path: 'rezepteerfassen',
    component: RezeptErfassenContainerComponent,
    data: {title: 'Rezept Erfassen -  Titel'},
    canActivate: [AuthGuard]
  },
  {
    path: 'rezepteerfassen/:id',
    component: RezeptErfassenContainerComponent,
    data: {title: 'Rezept Erfassen -  Titel2'},
    canActivate: [AuthGuard]
  },
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'home', component: RezeptHomeContainerComponent, data: {title: 'HOME -  Titel'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'}, // empty path is the default path
  {path: '**', component: PageNotFoundComponent, data: {title: 'IRGENDWAS -  Titel'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})

export class AppRoutingModule {
}
