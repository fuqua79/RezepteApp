import {Zutat} from "./zutat";
import {Naehrwerte} from "./naehrwerte";

export class Rezept {

  public _id?: string;
  public beschreibung : string = "";
  public titel : string = "";
  public zutatenAnzahl : number = 0;
  public zutaten : Array<Zutat> = new Array<Zutat>();
  public schwierigkeitsgrad : string = "";
  public zeit : number = 0;
  public zubereitung: string = "";
  public art : string = "";
  public selected : boolean= false;
  public imageFilename : string= "";
  public naehrwerte : Naehrwerte = new Naehrwerte();

  constructor() {
  }

}
