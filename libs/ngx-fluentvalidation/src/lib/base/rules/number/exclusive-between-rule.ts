import { PropertyRule } from '../../../core/rules/validation-rule';

export class ExclusiveBetweenRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly options: { min: number; max: number }) {
    super(value => {
      if (typeof value !== 'number') {
        throw new TypeError('Passed a non-numeric value to a numeric rule.');
      }
      return value > this.options.min && value < this.options.max;
    }, `Value must be greater than '${options.min}' and less than '${options.max}'.`);
  }
}
