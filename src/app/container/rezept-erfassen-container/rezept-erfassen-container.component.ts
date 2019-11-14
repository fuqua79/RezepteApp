import {Component, OnDestroy, OnInit} from '@angular/core';
import {createInitialRezept, Rezept} from '../../model/rezept';
import {ActivatedRoute, Router} from '@angular/router';
import {RezeptService} from '../../service/rezept.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {selectLoading} from '../../state/loading/loading.selectors';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-rezept-erfassen-container',
  templateUrl: './rezept-erfassen-container.component.html',
  styleUrls: ['./rezept-erfassen-container.component.css']
})
export class RezeptErfassenContainerComponent implements OnInit, OnDestroy {

  public isLoading$ = this.store.select(selectLoading);
  public rezept$: Observable<Rezept>;
  public optionsArt$: Observable<string[]>;

  private routeSubscription: Subscription;
  private rezeptId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rezeptService: RezeptService,
              private store: Store<GlobalState>) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.rezeptId = (params['id']);
      if (this.rezeptId) {
        this.rezept$ = this.rezeptService.loadRezept(this.rezeptId);
      } else {
        this.rezept$ = of(createInitialRezept());
      }
    });
    this.optionsArt$ = this.rezeptService.loadOptionsArt();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  saveRezept(form: any): void {
    this.rezeptService.saveRezept(form).subscribe(() => {
      this.router.navigate(['/rezeptliste/']);
    });
  }
}

