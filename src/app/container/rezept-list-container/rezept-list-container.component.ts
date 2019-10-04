import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RezeptService} from '../../service/rezept.service';
import {Observable} from 'rxjs/internal/Observable';
import {Rezept} from '../../model/rezept';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {SuchParameter} from '../../model/suchParameter';

@Component({
  selector: 'app-rezept-list-container',
  templateUrl: './rezept-list-container.component.html',
  styleUrls: ['./rezept-list-container.component.css']
})
export class RezeptListContainerComponent implements OnInit {

  public isLoading$: BehaviorSubject<boolean>;
  public rezeptListe$: Observable<Rezept[]>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private rezeptService: RezeptService) {
  }

  ngOnInit() {
    this.isLoading$ = this.rezeptService.isLoading$;
    this.rezeptListe$ = this.rezeptService.loadAllRezepte();
  }

  openRezept(id: string): void {
    this.router.navigate(['/rezept/' + id]);
  }

  searchRezept(suchParameter: SuchParameter) {
    this.rezeptListe$ = this.rezeptService.searchRezept(suchParameter);
  }
}
