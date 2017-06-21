import {Rezept} from './rezept';
import {Zutat} from "./zutat";

describe('Rezept', () => {
  it('should create an instance', () => {
    let zutat1 = new Zutat(100, 'ml', 'Milch');
    let zutaten = [zutat1];
    expect(new Rezept(1,'Milchreis - Beschreibung', 'Milchreis - Titel', zutaten, 500, 'einfach',25, 'Zubereitung', 'Art', '../dir/bild.jpg')).toBeTruthy();
  });

});
