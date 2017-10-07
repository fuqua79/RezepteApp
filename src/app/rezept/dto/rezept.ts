import {Zutat} from "./zutat";

export class Rezept {

  private _id : number;
  private _beschreibung : string = "";
  private _titel : string = "";
  private _zutaten : Array<Zutat>;
  private _kalorien : number = 0;
  private _schwierigkeitsgrad : string = "";
  private _zeit : number = 0;
  private _zubereitung: string = "";
  private _art : string = "";
  private _bildsrc : string = "";
  private _selected : boolean= false;
  private _url : string= "";

  constructor() {
    this._id = 203;
    this._zutaten = new Array<Zutat>();
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }
  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
  }
  get bildsrc(): string {
    return this._bildsrc;
  }

  set bildsrc(value: string) {
    this._bildsrc = value;
  }
  get art(): string {
    return this._art;
  }

  set art(value: string) {
    this._art = value;
  }
  get zubereitung(): string {
    return this._zubereitung;
  }

  set zubereitung(value: string) {
    this._zubereitung = value;
  }
  get zeit(): number {
    return this._zeit;
  }

  set zeit(value: number) {
    this._zeit = value;
  }
  get schwierigkeitsgrad(): string {
    return this._schwierigkeitsgrad;
  }

  set schwierigkeitsgrad(value: string) {
    this._schwierigkeitsgrad = value;
  }
  get kalorien(): number {
    return this._kalorien;
  }

  set kalorien(value: number) {
    this._kalorien = value;
  }
  get zutaten(): Array<Zutat> {
    return this._zutaten;
  }

  set zutaten(value: Array<Zutat>) {
    this._zutaten = value;
  }
  get titel(): string {
    return this._titel;
  }

  set titel(value: string) {
    this._titel = value;
  }
  get beschreibung(): string {
    return this._beschreibung;
  }

  set beschreibung(value: string) {
    this._beschreibung = value;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
