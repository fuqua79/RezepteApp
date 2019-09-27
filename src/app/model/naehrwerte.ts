export interface Naehrwerte {

  kalorien: number;
  fett: number;
  eiweiss: number;
  kohlenhydrate: number;

}

export function createInitialNaehrwerte(): Naehrwerte {
  return {
    kalorien: 0,
    fett: 0,
    eiweiss: 0,
    kohlenhydrate: 0
  }
}
