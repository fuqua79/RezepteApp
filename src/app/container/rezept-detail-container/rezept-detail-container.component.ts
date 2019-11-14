import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RezeptService} from '../../service/rezept.service';
import {Observable} from 'rxjs/internal/Observable';
import {Rezept} from '../../model/rezept';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {AuthService} from '../../service/auth.service';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-rezept-detail-container',
  templateUrl: './rezept-detail-container.component.html',
  styleUrls: ['./rezept-detail-container.component.css']
})
export class RezeptDetailContainerComponent implements OnInit, OnDestroy {

  public isLoading$: BehaviorSubject<boolean>;
  public rezept$: Observable<Rezept>;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private authUserId$ = this.store.select(state => state.auth.userId);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rezeptService: RezeptService,
              private authService: AuthService,
              private store: Store<GlobalState>) {
  }

  ngOnInit() {
    this.rezept$ = this.route.params
      .pipe(
        switchMap(params => this.rezeptService.loadRezept(params.id))
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  deleteRezept(rezeptId: string) {
    this.rezeptService.deleteRezept(rezeptId).subscribe(() => {
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
