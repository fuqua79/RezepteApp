import {Component, OnInit} from '@angular/core';
import {Rezept} from '../../model/rezept';
import {RezeptService} from '../../service/rezept.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';
import {selectLoading} from '../../state/loading/loading.selectors';

@Component({
  selector: 'app-rezept-home-container',
  templateUrl: './rezept-home-container.component.html',
  styleUrls: ['./rezept-home-container.component.css']
})
export class RezeptHomeContainerComponent implements OnInit {

  public isLoading$ = this.store.select(selectLoading);
  public randomRezept$: Observable<Rezept>;

  constructor(private rezeptService: RezeptService,
              private router: Router,
              private store: Store<GlobalState>) {
  }

  ngOnInit() {
    this.getRandomRezept();
  }

  getRandomRezept(): void {
    this.randomRezept$ = this.rezeptService.loadRandomRezept();
  }

  openRezept(id: string): void {
    this.router.navigate(['/rezept/' + id]);
  }
}
