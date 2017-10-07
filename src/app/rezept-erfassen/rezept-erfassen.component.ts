import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {Zutat} from "../rezept/dto/zutat";
import {Rezept} from "../rezept/dto/rezept";
import {RezeptService} from "../rezept/rezept.service";

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
              private router: Router,
              private rezeptService: RezeptService) {
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
        this.rezept._id = this.id;
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
    let zutat1 = new Zutat();
    zutat1.einheit = 'ml';
    zutat1.menge = 100;
    zutat1.zutat = 'Milch';
    let zutat2 = new Zutat();
    zutat2.einheit = 'dl';
    zutat2.menge = 2;
    zutat2.zutat = 'Wasser';
    let zutaten = [zutat1, zutat2];

    let rezept = new Rezept();
    rezept.beschreibung = 'Milchreis - Beschreibung';
    rezept.zutaten = zutaten;
    rezept.kalorien = 500;
    rezept.schwierigkeitsgrad = 'einfach';
    rezept.art = 'ART';
    rezept.zubereitung = 'Zubereitung';

    console.log('Speichere Rezept...');

    this.rezeptService.saveRezept(rezept).subscribe(result => {
      console.log('Rezept erfolgreich gespeichert');

    });
  }

  mylogger(text: string): void {
    console.log(text);
  }

}

