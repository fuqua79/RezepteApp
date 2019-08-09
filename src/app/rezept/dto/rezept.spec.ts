import {Rezept} from './rezept';
import {Zutat} from './zutat';

describe('Rezept', () => {
  it('should create an instance', () => {
    const zutat1 = new Zutat();
    const zutaten = [zutat1];
    expect(new Rezept()).toBeTruthy();
  });

});
