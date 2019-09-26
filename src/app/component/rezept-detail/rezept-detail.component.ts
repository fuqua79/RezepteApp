import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Rezept} from '../../model/rezept';
import {RezeptService} from '../../service/rezept.service';
import * as model from '../../model/model-interfaces';


@Component({
  selector: 'app-rezept',
  templateUrl: './rezept-detail.component.html',
  styleUrls: ['./rezept-detail.component.css']
})
export class RezeptComponent implements OnInit, OnDestroy {

  @Input()
  public rezept: Rezept;

  public gewunschteAnzahlPersonen = 1;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rezeptService: RezeptService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  editRezept(rezept$: Observable<Rezept>): void {
    rezept$.subscribe((rezept) => {
      console.log('Id= ', rezept.id);
      this.router.navigate(['/rezepteerfassen/' + rezept.id]);
    });
  }

  deleteRezept(rezept$: Observable<Rezept>) {
    rezept$.subscribe((rezept) => {
      console.log('Rezept loeschen mit Id= ', rezept.id);
      this.rezeptService.deleteRezept(rezept.id).subscribe(() => {
        console.log('Rezept erfolgreich geloescht');
        this.router.navigate(['/rezeptliste/']);
      });
    });
  }

  getTranslationSchwierigkeitsgrad(name: string): string {
    for (const elem in model.schwierigkeitsgrad) {
      if (model.schwierigkeitsgrad[elem].name === name) {
        return model.schwierigkeitsgrad[elem].value;
      }
    }
    return null;
  }

  getTranslationArt(name: string): string {
    for (const elem in model.art) {
      if (model.art[elem].name === name) {
        return model.art[elem].value;
      }
    }
    return null;
  }
}

