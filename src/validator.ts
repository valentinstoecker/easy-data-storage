export interface Validator<T> {
  isValid: (value: T) => boolean;
}

export const isString = {isValid: (v: string) => typeof v === 'string'};
export const isNumber = {isValid: (v: number) => typeof v === 'number'};
export const isPositive = {isValid: (v: number) => v >= 0};

/**
 * Check if object has required length
 * @param {number} x has length
 * @return {boolean} bool
 */
export function minLength(x: number): Validator<{length: number}> {
  return {isValid: (v) => v.length >= x};
}

/**
 * Validate all validators
 * @param {Validator<T>[]} vals validators to validate
 * @return {boolean}
 */
export function all<T>(...vals: Validator<T>[]): Validator<T> {
  return {
    isValid: (v) => {
      for (const val of vals) {
        if (!val.isValid(v)) {
          return false;
        }
      }
      return true;
    },
  };
}
