import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {Zutat} from "../rezept/dto/zutat";
import {Rezept} from "../rezept/dto/rezept";

@Component({
  selector: 'app-rezept-erfassen',
  templateUrl: './rezept-erfassen.component.html',
  styleUrls: ['./rezept-erfassen.component.css']
})
export class RezeptErfassenComponent implements OnInit {

  private id: number;
  private rezept: Rezept;
  public inputData: Rezept;
  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.mylogger('RezeptErfassen-Component');
  }

  ngOnInit() {
    console.log('ngOnInit !');
    this.inputData = new Rezept();

    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = (params['id'] || '');

      if (this.id) {
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
        this.inputData = this.rezept;

      } else {
        console.log('Rezept neu erfassen');
      }
    });
  }

  addZutat(): void {
    this.inputData.zutaten.push(new Zutat());
  }

  removeZutat(arrayIndex: number): void {
    console.log('arrayIndex: ', arrayIndex)
    this.inputData.zutaten.splice(arrayIndex);
  }

  saveRezept(inputData: Rezept): void {
    //Speichern...
    console.log('Speichere Rezept...');
  }

  mylogger(text: string): void {
    console.log(text);
  }

}

