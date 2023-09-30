import { ValidationFailure } from '../result/validation-failure';
import { ExtendedRule } from './extended-rule';
import { isCallable } from './guards';

export abstract class PropertyRule<TModel, TProperty> extends ExtendedRule<TModel> {
  private failure: ValidationFailure | null = null;

  public get validationFailure(): ValidationFailure | null {
    return this.failure;
  }

  constructor(
    private readonly validation: (value: TProperty | null | undefined, model: TModel) => boolean | null,
    private readonly errorMessageOrModel: string | ((model: TModel) => string)
  ) {
    super();
  }

  /**
   * Validates the given value.
   * @returns `boolean` indicating the resulting state of the validation - `null` if the validation was skipped due to conditions.
   */
  public validate(value: TProperty | null | undefined, model: TModel): boolean | null {
    if (this.when != null && !this.when(model)) {
      return null;
    }

    if (this.unless != null && this.unless(model)) {
      return null;
    }

    const validationResult = this.validation(value, model);
    this.failure = validationResult
      ? null
      : { attemptedValue: value, errorMessage: this.getErrorMessage(model), propertyName: this.propertyName };
    return validationResult;
  }

  private getErrorMessage(model: TModel): string {
    if (this.customErrorMessage) {
      return this.customErrorMessage;
    } else if (isCallable(this.errorMessageOrModel)) {
      return this.errorMessageOrModel(model);
    }
    return this.errorMessageOrModel;
  }
}
