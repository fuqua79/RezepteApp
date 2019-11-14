import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RezeptService} from '../../service/rezept.service';
import {Observable} from 'rxjs/internal/Observable';
import {Rezept} from '../../model/rezept';
import {SuchParameter} from '../../model/suchParameter';
import {selectLoading} from '../../state/loading/loading.selectors';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-rezept-list-container',
  templateUrl: './rezept-list-container.component.html',
  styleUrls: ['./rezept-list-container.component.css']
})
export class RezeptListContainerComponent implements OnInit {

  public isLoading$ = this.store.select(selectLoading);
  public rezeptListe$: Observable<Rezept[]>;
  public optionsArt$: Observable<string[]>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private rezeptService: RezeptService,
              private store: Store<GlobalState>) {
  }

  ngOnInit(): void {
    this.rezeptListe$ = this.rezeptService.loadAllRezepte();
    this.optionsArt$ = this.rezeptService.loadOptionsArt();
  }

  openRezept(id: string): void {
    this.router.navigate(['/rezept/' + id]);
  }

  searchRezept(suchParameter: SuchParameter) {
    this.rezeptListe$ = this.rezeptService.searchRezept(suchParameter);
  }
}
