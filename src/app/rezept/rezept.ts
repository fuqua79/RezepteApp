import {Zutat} from "./zutat";


export class Rezept {

    public id : number;
    public beschreibung : string = "";
    public titel : string = "";
    public zutaten : Array<Zutat>;
    public kalorien : number;
    public schwierigkeitsgrad : string = "";
    public zeit : number;
    public zubereitung: string = "";
    public art : string = "";
    public bildsrc : string = "";
    public selected : boolean= false;

    constructor(id, beschreibung, titel, zutaten, kalorien, schwierigkeitsgrad, zeit, zubereitung, art, bildsrc) {
        this.id= id;
        this.beschreibung = beschreibung;
        this.titel = titel;
        this.zutaten = zutaten;
        this.kalorien  = kalorien;
        this.schwierigkeitsgrad = schwierigkeitsgrad;
        this.zeit = zeit;
        this.zubereitung = zubereitung;
        this.art = art;
        this.bildsrc = bildsrc;
    }


    addZutat(zutat: Zutat) : void {
        this.zutaten.push(zutat);
    }

    removeZutat(arrayIndex: number) : void {
        this.zutaten.splice(arrayIndex, 1);
    }


}
