import {Validator} from './validator';

export type Property<T> = Validator<T> | SchemaData<T>;

export type SchemaData<T> = {
  [P in keyof T]: Property<T[P]>;
};

export interface Schema<T> {
  name: string;
  data: SchemaData<T>;
}

/**
 * internal recursive validator
 * @param {SchemaData<T>} schema Validation Schema
 * @param {T} data Data to validate
 * @return {boolean}
 */
function _validate<T, U extends T>(schema: SchemaData<T>, data: U): boolean {
  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      const element = schema[key];
      if ('isValid' in element) {
        if (!element.isValid(data[key])) return false;
      } else if (typeof element === 'object') {
        // @ts-ignore
        if (!_validate(element, data[key])) return false;
      }
    }
  }
  return true;
}

/**
 * Validate data with schema
 * @param {Schema<T>} schema Validation schema
 * @param {T} data Data to validate
 * @return {boolean} true if valid
 */
export function validate<T, U extends T>(schema: Schema<T>, data: U): boolean {
  return _validate(schema.data, data);
}
