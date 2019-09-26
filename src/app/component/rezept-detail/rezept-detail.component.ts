import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Rezept} from '../../model/rezept';
import * as model from '../../model/model-interfaces';


@Component({
  selector: 'app-rezept',
  templateUrl: './rezept-detail.component.html',
  styleUrls: ['./rezept-detail.component.css']
})
export class RezeptComponent implements OnInit, OnDestroy {

  @Input()
  public rezept: Rezept;

  @Input()
  isLoading: boolean;

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  open = new EventEmitter<string>();

  @Output()
  print = new EventEmitter<string>();

  public gewunschteAnzahlPersonen = 1;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  openRezept(rezeptId: string): void {
    this.open.emit(rezeptId);
  }

  deleteRezept(rezeptId: string) {
    this.delete.emit(rezeptId);
  }

  printRezept(rezeptId: string) {
    this.print.emit(rezeptId);
  }

  getTranslationSchwierigkeitsgrad(name: string): string {
    for (const elem in model.schwierigkeitsgrad) {
      if (model.schwierigkeitsgrad[elem].name === name) {
        return model.schwierigkeitsgrad[elem].value;
      }
    }
    return null;
  }

  getTranslationArt(name: string): string {
    for (const elem in model.art) {
      if (model.art[elem].name === name) {
        return model.art[elem].value;
      }
    }
    return null;
  }
}

