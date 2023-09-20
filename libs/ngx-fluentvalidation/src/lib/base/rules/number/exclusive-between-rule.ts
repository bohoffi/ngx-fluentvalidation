import { AbstractRule } from '../../../core/rules/abstract-rule';

export class ExclusiveBetweenRule extends AbstractRule<number> {
  constructor(private readonly options: { min: number; max: number }) {
    super(
      `Value must be greater than '${options.min}' and less than '${options.max}'.`,
      value => value > this.options.min && value < this.options.max
    );
  }
}
