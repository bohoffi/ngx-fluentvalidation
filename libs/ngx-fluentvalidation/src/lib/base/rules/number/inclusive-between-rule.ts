import { AbstractRule } from '../../../core/rules/abstract-rule';

export class InclusiveBetweenRule extends AbstractRule<number> {
  constructor(private readonly options: { min: number; max: number }) {
    super(
      `Value must be greater than or equal to '${options.min}' and less than or equal to '${options.max}'`,
      value => value >= this.options.min && value <= this.options.max
    );
  }
}
