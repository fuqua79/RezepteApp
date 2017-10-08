import {Zutat} from "./zutat";

export class Rezept {

  public _id?: number;
  public beschreibung : string = "";
  public titel : string = "";
  public zutatenAnzahl : number = 0;
  public zutaten : Array<Zutat> = new Array<Zutat>();
  public kalorien : number = 0;
  public schwierigkeitsgrad : string = "";
  public zeit : number = 0;
  public zubereitung: string = "";
  public art : string = "";
  public bildsrc : string = "";
  public selected : boolean= false;
  public url : string= "";

  constructor() {
  }

}
