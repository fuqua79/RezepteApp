import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {Zutat} from "../rezept/zutat";
import {Rezept} from "../rezept/rezept";

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
        console.log('ngOnIniti');
        this.routeSubscription = this.route.params.subscribe(params => {
            this.id = (params['id'] || '');

            if(this.id) {
                //this.rezept = this.rezeptService.getRezept(id);
                console.log('Rezept mit Id: ', this.id, ' holen')

                let zutat1 = new Zutat(100, 'ml', 'Milch');
                let zutat2 = new Zutat(200, 'dl', 'Wasser');
                let zutaten = [zutat1, zutat2];
                this.rezept = new Rezept(this.id, 'Milchreis - Beschreibung', 'Milchreis - Titel', zutaten, 500, 'einfach', 25, 'Zubereitung', 'Art', '../dir/bild.jpg');
                this.inputData = this.rezept;

            } else {
                console.log('Rezept neu erfassen');


            }


        });
    }
/*
    zutat1 = new Zutat(100, 'ml', 'Milch');
    zutat2 = new Zutat(200, 'g', 'Reis');
    zutaten = [this.zutat1, this.zutat2];
    inputData = new Rezept(1, 'Milchreis - Beschreibung', 'Milchreis - Titel Data1', this.zutaten, 500, 'einfach', 25, 'Zubereitung', 'Art', '../dir/bild.jpg');
*/


    addZutat() : void {
        this.inputData.addZutat(new Zutat());
    }

    removeZutat(arrayIndex: number) : void {
        console.log('arrayIndex: ', arrayIndex)
        this.inputData.removeZutat(arrayIndex);
    }

    saveRezept(inputData: Rezept) : void {
        //Speichern...
        console.log('Speichere Rezept...');
    }


    mylogger(text: string): void {
        console.log(text);
    }
}

