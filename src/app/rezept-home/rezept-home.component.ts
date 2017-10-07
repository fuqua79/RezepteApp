import {Component, OnInit} from '@angular/core';
import {RezeptService} from '../rezept/rezept.service';
import {Rezept} from "../rezept/dto/rezept";
import {Zutat} from "../rezept/dto/zutat";

@Component({
    selector: 'app-rezept-home',
    templateUrl: './rezept-home.component.html',
    styleUrls: ['./rezept-home.component.css']
})
export class RezeptHomeComponent implements OnInit {

    private rezeptListe: Array<Rezept>;
    private randomRezept : Rezept;

    constructor(private rezeptService: RezeptService) {
    }

    ngOnInit() {
      this.getRandomRezept();
    }

    getRandomRezept(): void {
      console.log("-- RandomRezept aus dem Backend holen --");
      this.rezeptService.loadRezept('59d8e095f32cc63f6835287e').subscribe(result => {
        console.log('Rezept am GUI angekommen mit id= ' +result._id);
        this.randomRezept = new Rezept();
        this.randomRezept = result;

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
        console.log('rezept.beschreibung: ' +rezept.beschreibung);


        console.log('randomRezept.Id: ', this.randomRezept._id);
        console.log('randomRezept.titel: ', this.randomRezept.beschreibung);
        //console.log('randomRezept.titel: ', this.randomRezept._beschreibung);

      });

      /*
        this.rezeptService.getRezeptListe().then((rezeptListe) => {
            this.rezeptListe = rezeptListe;
            let min: number = 0;
            let max: number = this.rezeptListe.length - 1;
            console.log('min: ', min);
            console.log('max: ', max);
            let zufallszahl: number = Math.floor(min + Math.random() * ((max + 1) - min));
            console.log('zufallszahl: ', zufallszahl);

            this.randomRezept = this.rezeptListe[zufallszahl];

            console.log('randomRezept.Id: ', this.randomRezept.id);
        });
        */

    }

}
