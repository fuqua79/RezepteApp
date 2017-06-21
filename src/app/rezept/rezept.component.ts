import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {Rezept} from "./rezept";
import {Zutat} from "./zutat";


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

            let zutat1 = new Zutat(100, 'ml', 'Milch');
            let zutat2 = new Zutat(200, 'dl', 'Wasser');
            let zutaten = [zutat1, zutat2];
            this.rezept = new Rezept(this.id, 'Milchreis - Beschreibung', 'Milchreis - Titel', zutaten, 500, 'einfach', 25, 'Zubereitung', 'Art', '../dir/bild.jpg');
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
