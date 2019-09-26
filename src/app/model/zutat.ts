export interface Zutat {

  menge: number;
  einheit: string;
  zutat: string

}

export function createInitialZutat(): Zutat {
  return {
    menge: 0,
    einheit: '',
    zutat: ''
  }
}

