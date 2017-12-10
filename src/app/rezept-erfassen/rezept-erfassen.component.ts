import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {Zutat} from "../rezept/dto/zutat";
import {Rezept} from "../rezept/dto/rezept";
import {RezeptService} from "../rezept/rezept.service";
import * as model from "../rezept/dto/model-interfaces";


@Component({
  selector: 'app-rezept-erfassen',
  templateUrl: './rezept-erfassen.component.html',
  styleUrls: ['./rezept-erfassen.component.css']
})
export class RezeptErfassenComponent implements OnInit {

  private id: string;
  public rezept: Rezept;
  public model = model;

  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private rezeptService: RezeptService) {
  }

  ngOnInit() {
    console.log('ngOnInit !');
    this.rezept = new Rezept(); //Zum Erzeugen mal ein leeres Rezept !

    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = (params['id'] || '');

      if (this.id) {
        console.log('Rezept mit Id: ', this.id, ' holen')
        this.rezeptService.loadRezept(this.id).subscribe(rezept => {
          this.rezept = rezept;
        });
      } else {
        console.log('Rezept neu erfassen');
        this.rezept = new Rezept();


console.log('MIKE, REZEPT: ', this.rezept);

      }
    });
  }

  addZutat(): void {
    let zutat = new Zutat();
    this.rezept.zutaten.push(zutat);
  }

  removeZutat(arrayIndex: number): boolean {
    this.rezept.zutaten.splice(arrayIndex, 1);
    return false;
  }

  saveRezept(rezept: Rezept): void {
    //Speichern...
    this.rezeptService.saveRezept(rezept).subscribe(result => {
    });
  }

  /*
  saveImage(path: string): void {
    //Speichern...
    console.log('Speichere Image...');

    this.rezeptService.saveImage(path).subscribe(result => {
      console.log('Image erfolgreich gespeichert');
    });
  }


  loadImage(id: string): void {
    //Speichern...
    console.log('Laden Image...');

    this.rezeptService.loadImage(id).subscribe(result => {
      console.log('Image erfolgreich geholt', result);
    });
  }
  */

  onFileChange(fileInput){
    console.log('FILE SAVEN, fileInput:', fileInput);
    let file = fileInput.target.files[0].name;
    console.log('FILE SAVEN, file :', file );
    this.rezept.imageFilename = file;
    // let fileName = file.name;
  }

}

