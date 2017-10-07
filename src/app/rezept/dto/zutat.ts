export class Zutat {

  private _menge: number = 0;
  private _einheit: string = "";
  private _zutat: string = ""

  constructor() {
  }

  get zutat(): string {
    return this._zutat;
  }

  set zutat(value: string) {
    this._zutat = value;
  }

  get einheit(): string {
    return this._einheit;
  }

  set einheit(value: string) {
    this._einheit = value;
  }

  get menge(): number {
    return this._menge;
  }

  set menge(value: number) {
    this._menge = value;
  }
}
