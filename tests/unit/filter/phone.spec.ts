import each from 'jest-each';
import phoneFilter from '@/filters/phone';

const dataset: string[][] = [
  ['', '', ''],
  ['123-45-67', '1234567', ''],
  ['(123) 45-67-89', '123456789', ''],
  ['+7 (999) 888-77-66', '+79998887766', ''],
  ['+7 (999) 888-77-66', '+79998887766', '+7'],
];

describe('Phone filter', () => {
  beforeEach(() => {
  });
  each(dataset).it(`Get '%s' from '%s' with country '%s'`, (expected: string, input: string, country: string) => {
    const actual = phoneFilter(input, country);

    expect(actual).toBe(expected);
  });
});
