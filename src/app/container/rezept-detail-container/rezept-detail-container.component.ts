import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RezeptService} from '../../service/rezept.service';
import {Observable} from 'rxjs/internal/Observable';
import {Rezept} from '../../model/rezept';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {AuthService} from '../../service/auth.service';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';
import {selectLoading} from '../../state/loading/loading.selectors';

@Component({
  selector: 'app-rezept-detail-container',
  templateUrl: './rezept-detail-container.component.html',
  styleUrls: ['./rezept-detail-container.component.css']
})
export class RezeptDetailContainerComponent implements OnInit, OnDestroy {

  public isLoading$ = this.store.select(selectLoading);
  public authUserId$ = this.store.select(state => state.auth.userId);
  public rezept$: Observable<Rezept>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rezeptService: RezeptService,
              private authService: AuthService,
              private store: Store<GlobalState>) {
  }

  ngOnInit(): void {
    this.rezept$ = this.route.params
      .pipe(switchMap(params => this.rezeptService.loadRezept(params.id)));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  deleteRezept(rezeptId: string) {
    this.rezeptService.deleteRezept(rezeptId).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.router.navigate(['/rezeptliste/']);
    });
  }

  openRezept(rezeptId: string) {
    this.router.navigate(['/rezepteerfassen/' + rezeptId]);
  }

  printRezept(rezeptId: string) {
    // TODO: to implement
    console.log('Jetzt sollte das Rezet gedruckt werden....' + rezeptId);
  }
}
