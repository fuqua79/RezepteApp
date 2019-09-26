import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RezeptService} from '../../service/rezept.service';
import {Observable} from 'rxjs/internal/Observable';
import {Rezept} from '../../model/rezept';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';

@Component({
  selector: 'app-rezept-detail-container',
  templateUrl: './rezept-detail-container.component.html',
  styleUrls: ['./rezept-detail-container.component.css']
})
export class RezeptDetailContainerComponent implements OnInit, OnDestroy {

  private rezept$: Observable<Rezept>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rezeptService: RezeptService) {
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

  printIt() {
    // TODO:implement
    console.log('Jetzt sollte das Rezet gedruckt werden....')
  }

  deleteRezept() {
    this.rezept$.pipe(takeUntil(this.unsubscribe$)).subscribe((rezept) => {
      this.rezeptService.deleteRezept(rezept.id).subscribe(() => {
        this.router.navigate(['/rezeptliste/']);
      });
    });
  }

  editRezept() {
    this.rezept$.pipe(takeUntil(this.unsubscribe$)).subscribe((rezept) => {
      this.router.navigate(['/rezepteerfassen/' + rezept.id]);
    });
  }
}
