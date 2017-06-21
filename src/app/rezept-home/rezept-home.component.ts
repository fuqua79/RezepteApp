import {Component, OnInit} from '@angular/core';
import {RezeptService} from '../rezept.service';
import {Rezept} from "../rezept/rezept";

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
    }


    getRandomRezept(): void {

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

    }

}
