import { ComboBoxFilterPipe } from './combo-box-filter.pipe';

const value = [
  { id: 0, name: 'English', code: 'en' },
  { id: 1, name: 'Vietnamese', code: 'vi' },
  { id: 2, name: 'Japanese', code: 'jp' },
];

describe('ComboBoxFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ComboBoxFilterPipe();
    expect(pipe).toBeTruthy();
  });
  describe('transform', () => {
    it('should return filterd value', () => {
      const pipe = new ComboBoxFilterPipe();
      const keys = 'name,code';
      const resultWithoutKeyword = pipe.transform(value, keys, '');
      expect(resultWithoutKeyword).toEqual([
        { id: 0, name: 'English', code: 'en' },
        { id: 1, name: 'Vietnamese', code: 'vi' },
        { id: 2, name: 'Japanese', code: 'jp' },
      ]);
      const resultWithKeyword = pipe.transform(value, keys, 'a');
      expect(resultWithKeyword).toEqual([
        { id: 1, name: 'Vietnamese', code: 'vi' },
        { id: 2, name: 'Japanese', code: 'jp' },
      ]);
      const resultWithKeyword2 = pipe.transform(value, keys, 'jp');
      expect(resultWithKeyword2).toEqual([
        { id: 2, name: 'Japanese', code: 'jp' },
      ]);
      const resultWithKeyword3 = pipe.transform(value, keys, 'jpa');
      expect(resultWithKeyword3).toEqual([]);
    });
  });
});
