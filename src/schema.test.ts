import {validate} from './schema';
import {all, isNumber, isPositive, isString, minLength} from './validator';

test('test validate', () => {
  type x = {name: string; age: number; scores: {min: number; max: number}};

  const testSchema = {
    name: 'test',
    data: {
      name: all(isString, minLength(3)),
      age: isNumber,
      scores: {
        min: all(isNumber, isPositive),
        max: all(isNumber, isPositive),
      },
    },
  };
  expect(
    validate<x, x>(testSchema, {
      name: '',
      age: 3,
      scores: {
        min: -1,
        max: 1,
      },
    })
  ).toBe(false);
  expect(
    validate<x, x>(testSchema, {
      name: 'pipo',
      age: 3,
      scores: {
        min: -1,
        max: 1,
      },
    })
  ).toBe(false);
  expect(
    validate<x, x>(testSchema, {
      name: 'hallo',
      age: 3,
      scores: {
        min: 0,
        max: 1,
      },
    })
  ).toBe(true);
});
