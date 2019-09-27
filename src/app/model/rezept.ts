import {createInitialZutat, Zutat} from './zutat';
import {createInitialNaehrwerte, Naehrwerte} from './naehrwerte';

export interface Rezept {

  id?: string;
  beschreibung: string;
  titel: string;
  anzahlPersonen: number;
  zutaten: Array<Zutat>;
  schwierigkeitsgrad: string;
  zeit: number;
  zubereitung: string;
  art: string;
  selected: boolean;
  naehrwerte: Naehrwerte;
  imagePath: string;

}

export function createInitialRezept(): Rezept {
  return {
    beschreibung: '',
    titel: '',
    anzahlPersonen: 1,
    zutaten: [createInitialZutat()],
    schwierigkeitsgrad: '',
    zeit: 0,
    zubereitung: '',
    art: '',
    selected: false,
    imagePath: '',
    naehrwerte: createInitialNaehrwerte()
  }

}
