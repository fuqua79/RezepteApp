import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {RezeptService} from '../rezept/rezept.service';
import {Zutat} from "../rezept/dto/zutat";
import {Rezept} from "../rezept/dto/rezept";


@Component({
    selector: 'app-rezept-liste',
    templateUrl: './rezept-liste.component.html',
    styleUrls: ['./rezept-liste.component.css'],
    providers: [RezeptService]
})
export class RezeptListeComponent implements OnInit {

    private rezeptListe: Array<Rezept>;
    //TEST
    private posts : any;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private rezeptService: RezeptService) {
        this.mylogger('RezeptListe-Component');
    }

    ngOnInit() {
        console.log('Lsite holen');
        this.rezeptService.getRezeptListe().then(rezeptListe => this.rezeptListe = rezeptListe);
        console.log('Liste geholt...');

        console.log('POSTS holen');
        this.rezeptService.getAllPosts().subscribe(posts => {
            this.posts = posts;
        });
        console.log('POSTS geholt...');

    }

    //Testdaten erzeugen
    /*
     zutat1 = new Zutat(100, 'ml', 'Milch');
     zutat2 = new Zutat(200, 'g', 'Reis');
     zutaten = [this.zutat1, this.zutat2];

     rezept1 = new Rezept(1,'Milchreis - Beschreibung', 'Milchreis - Titel', this.zutaten, 500, 'einfach',25, 'Zubereitung', 'Art', '../dir/bild.jpg')
     rezept2 = new Rezept(2,'Milchreis - Beschreibung', 'Milchreis - Titel', this.zutaten, 500, 'einfach',25, 'Zubereitung', 'Art', '../dir/bild.jpg')
     rezept3 = new Rezept(3,'Milchreis - Beschreibung', 'Milchreis - Titel', this.zutaten, 500, 'einfach',25, 'Zubereitung', 'Art', '../dir/bild.jpg')
     rezept4 = new Rezept(4,'Milchreis - Beschreibung', 'Milchreis - Titel', this.zutaten, 500, 'einfach',25, 'Zubereitung', 'Art', '../dir/bild.jpg')
     rezept5 = new Rezept(5,'Milchreis - Beschreibung', 'Milchreis - Titel', this.zutaten, 500, 'einfach',25, 'Zubereitung', 'Art', '../dir/bild.jpg')
     rezept6 = new Rezept(6,'Milchreis - Beschreibung', 'Milchreis - Titel', this.zutaten, 500, 'einfach',25, 'Zubereitung', 'Art', '../dir/bild.jpg')
     rezept7 = new Rezept(7,'Milchreis - Beschreibung', 'Milchreis - Titel', this.zutaten, 500, 'einfach',25, 'Zubereitung', 'Art', '../dir/bild.jpg')
     rezept8 = new Rezept(8,'Milchreis - Beschreibung', 'Milchreis - Titel', this.zutaten, 500, 'einfach',25, 'Zubereitung', 'Art', '../dir/bild.jpg')

     rezeptListe = [this.rezept1, this.rezept2,this.rezept3, this.rezept4,this.rezept5, this.rezept6,this.rezept7, this.rezept8];
     */


    openRezept(id: number): void {
        console.log('Id= ', id);
        // const relUrl = this.router.url.includes()
        this.router.navigate(['/rezept/' + id]);
    }


    selectRezept(id: number): void {
        console.log('selektieren Id= ', id);
        for (let i = 0; i < this.rezeptListe.length; i++) {
            this.rezeptListe[i].selected = false;
            if (this.rezeptListe[i].id === id) {
                this.rezeptListe[i].selected = true;
            }
        }
        console.log('Selektiert....');
    }

    editRezept(id: number): void {
        console.log('Rezept bearbeiten');
        this.router.navigate(['/rezepteerfassen/' + id]);
    }

    mylogger(text: string): void {
        console.log(text);
    }
}
