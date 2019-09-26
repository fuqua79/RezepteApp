import {createInitialZutat, Zutat} from './zutat';
import {createInitialNaehrwerte, Naehrwerte} from './naehrwerte';

export interface Rezept {

  id?: string;
  beschreibung: string;
  titel: string;
  zutatenAnzahl: number;
  zutaten: Array<Zutat>;
  schwierigkeitsgrad: string;
  zeit: number;
  zubereitung: string;
  art: string;
  selected: boolean;
  imageFilename: string;
  naehrwerte: Naehrwerte;

}

export function createInitialRezept(): Rezept {
  return {
    beschreibung: '',
    titel: '',
    zutatenAnzahl: 0,
    zutaten: [createInitialZutat()],
    schwierigkeitsgrad: '',
    zeit: 0,
    zubereitung: '',
    art: '',
    selected: false,
    imageFilename: '',
    naehrwerte: createInitialNaehrwerte()
  }

}
