import {Zutat} from "./zutat";

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
  public kalorien : number = 0;
  public fett : number = 0;
  public eiweiss : number = 0;
  public kohlenhydrate : number = 0;

  constructor() {
  }

}
