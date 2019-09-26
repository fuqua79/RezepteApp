import {Component, OnDestroy, OnInit} from '@angular/core';
import {createInitialRezept, Rezept} from '../../model/rezept';
import {ActivatedRoute, Router} from '@angular/router';
import {RezeptService} from '../../service/rezept.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-rezept-erfassen-container',
  templateUrl: './rezept-erfassen-container.component.html',
  styleUrls: ['./rezept-erfassen-container.component.css']
})
export class RezeptErfassenContainerComponent implements OnInit, OnDestroy {

  public rezept$: Observable<Rezept>;
  private routeSubscription: Subscription;
  private rezeptId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rezeptService: RezeptService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.rezeptId = (params['id']);
      if (this.rezeptId) {
        console.log('Rezept mit Id: ', this.rezeptId, ' holen');
        this.rezept$ = this.rezeptService.loadRezept(this.rezeptId);
      } else {
        console.log('Rezept neu erfassen');
        this.rezept$ = of(createInitialRezept());
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  saveRezept(rezept: Rezept): void {
    this.rezeptService.saveRezept(rezept).subscribe(() => {
      console.log('Rezept ist erfolgreich gespeichert worden...');
      this.router.navigate(['/rezeptliste/']);
    });
  }
}

