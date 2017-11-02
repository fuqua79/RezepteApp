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

  public rezeptListe: Array<Rezept>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private rezeptService: RezeptService) {
    this.mylogger('RezeptListe-Component');
  }

  ngOnInit() {
    console.log("real api REST aufruf");
    this.rezeptService.loadAllRezepte().subscribe(result => {
      console.log('Rezeptliste geholt= ' +result);
       for(let rezept of result) {
         if(rezept.imageFilename) {
           rezept.imageFilename = '../../assets/images/' + rezept.imageFilename;
         }
       }
      this.rezeptListe = result;
    });
  }

  openRezept(id: string): void {
    console.log('Rezpet oeffnen mit id= ', id);
    this.router.navigate(['/rezept/' + id]);
  }


  selectRezept(id: string): void {
    console.log('selektieren Id= ', id);
    for (let i = 0; i < this.rezeptListe.length; i++) {
      this.rezeptListe[i].selected = false;
      if (this.rezeptListe[i]._id === id) {
        this.rezeptListe[i].selected = true;
      }
    }
    console.log('Selektiert....');
  }
/*
  editRezept(id): void {
    console.log('Rezept bearbeiten');
    this.router.navigate(['/rezept/' + id]);
  }
*/

  mylogger(text: string): void {
    console.log(text);
  }
}
