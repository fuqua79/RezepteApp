import {Zutat} from './zutat';
import {Naehrwerte} from './naehrwerte';

export class Rezept {

  public id?: string;
  public beschreibung = '';
  public titel = '';
  public zutatenAnzahl = 0;
  public zutaten: Array<Zutat> = new Array<Zutat>();
  public schwierigkeitsgrad = '';
  public zeit = 0;
  public zubereitung = '';
  public art = '';
  public selected= false;
  public imageFilename= '';
  public naehrwerte: Naehrwerte = new Naehrwerte();

  constructor() {
  }

}
