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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private rezeptService: RezeptService) {
    this.mylogger('RezeptListe-Component');
  }

  ngOnInit() {
    console.log("real api REST aufruf");
    this.rezeptService.loadAllRezepte().subscribe(result => {
      console.log('Rezept am GUI angekommen mit id= ' +result);
      this.rezeptListe = result;
    });
    console.log("real rezepteliste vom BAckend geholt !");
  }



  openRezept(id: number): void {
    console.log('Id= ', id);
    // const relUrl = this.router.url.includes()
    this.router.navigate(['/rezept/' + id]);
  }


  selectRezept(id: number): void {
    console.log('selektieren Id= ', id);
    for (let i = 0; i < this.rezeptListe.length; i++) {
      this.rezeptListe[i].selected = false;
      if (this.rezeptListe[i]._id === id) {
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
