import {Zutat} from './zutat';

describe('Zutat', () => {
  it('should create an instance', () => {
    expect(new Zutat(100, 'ml', 'Milch')).toBeTruthy();
  });
});
