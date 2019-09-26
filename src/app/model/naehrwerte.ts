export interface Naehrwerte {

  kalorien: number;
  fett: number;
  eiweis: number;
  kohlenhydrate: number;

}

export function createInitialNaehrwerte(): Naehrwerte {
  return {
    kalorien: 0,
    fett: 0,
    eiweis: 0,
    kohlenhydrate: 0
  }
}
