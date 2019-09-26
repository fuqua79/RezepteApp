import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {createInitialZutat} from '../../model/zutat';
import {createInitialRezept, Rezept} from '../../model/rezept';
import * as model from '../../model/model-interfaces';


@Component({
  selector: 'app-rezept-erfassen',
  templateUrl: './rezept-erfassen.component.html',
  styleUrls: ['./rezept-erfassen.component.css']
})
export class RezeptErfassenComponent implements OnInit {

  @Input()
  rezeptInput: Rezept;

  @Output()
  save = new EventEmitter<Rezept>();

  public model = model;

  constructor() {
  }

  ngOnInit() {
  }

  addZutat(): void {
    const zutat = createInitialZutat();
    this.rezeptInput.zutaten.push(zutat);
  }

  removeZutat(arrayIndex: number): boolean {
    this.rezeptInput.zutaten.splice(arrayIndex, 1);
    return false;
  }

  saveRezept(rezept: Rezept): void {
    this.save.emit(rezept);
  }

  onFileChange(fileInput) {
    console.log('FILE SAVEN, fileInput:', fileInput);
    const file = fileInput.target.files[0].name;
    console.log('FILE SAVEN, file :', file);
    this.rezeptInput.imageFilename = file;
    // let fileName = file.name;
  }

}

