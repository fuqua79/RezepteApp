import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {Rezept} from "./dto/rezept";
import {Zutat} from "./dto/zutat";


@Component({
  selector: 'app-rezept',
  templateUrl: './rezept.component.html',
  styleUrls: ['./rezept.component.css']
})
export class RezeptComponent implements OnInit {

  private id: number;
  private rezept: Rezept;
  private gewunschteAnzahlPersonen: number = 1;

  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.mylogger('RezeptComponent');
  }

  ngOnInit() {
    console.log('ngOnIniti');
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = (params['id'] || '');
      //this.rezept = this.rezeptService.getRezept(id);
      console.log('Rezept mit Id: ', this.id, ' holen')


      let zutat1 = new Zutat();
      zutat1.einheit = 'ml';
      zutat1.menge = 100;
      zutat1.zutat = 'Milch';
      let zutat2 = new Zutat();
      zutat2.einheit = 'dl';
      zutat2.menge = 2;
      zutat2.zutat = 'Wasser';
      let zutaten = [zutat1, zutat2];
      this.rezept = new Rezept();
      this.rezept.id = this.id;
      this.rezept.beschreibung = 'Milchreis - Beschreibung';
      this.rezept.zutaten = zutaten;
      this.rezept.kalorien = 500;
      this.rezept.schwierigkeitsgrad = 'einfach';
      this.rezept.art = 'ART';
      this.rezept.zubereitung = 'Zubereitung';

    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  editRezept(id: number): void {
    console.log('Id= ', this.id);
    // const relUrl = this.router.url.includes()
    this.router.navigate(['/rezepteerfassen/' + this.id]);
  }

  mylogger(text: string): void {
    console.log(text);
  }

}
