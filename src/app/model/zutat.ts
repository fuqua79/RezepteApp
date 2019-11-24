export interface Zutat {

  menge: number;
  einheit: string;
  zutat: string

}

export function createInitialZutat(): Zutat {
  return {
    menge: null,
    einheit: '',
    zutat: ''
  }
}

