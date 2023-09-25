import { ValidationFailure } from '../result/validation-failure';
import { PropertyValidation } from './validation';

class ConditionalRule<TModel> {
  protected when: ((model: TModel) => boolean) | null = null;
  protected unless: ((model: TModel) => boolean) | null = null;

  public withWhenCondition(condition: (model: TModel) => boolean): void {
    this.when = condition;
  }

  public withUnlessCondition(condition: (model: TModel) => boolean): void {
    this.unless = condition;
  }
}

class ExtendedRule<TModel> extends ConditionalRule<TModel> {
  protected propertyName?: string;
  protected customErrorMessage?: string;

  public withPropertyName(propertyName?: string): void {
    this.propertyName = propertyName;
  }

  public withCustomMessage(customMessage: string): void {
    this.customErrorMessage = customMessage;
  }
}

export abstract class PropertyRule<TModel, TProperty> extends ExtendedRule<TModel> {
  private failure: ValidationFailure | null = null;

  public get validationFailure(): ValidationFailure | null {
    return this.failure;
  }

  constructor(private readonly validation: PropertyValidation<TModel, TProperty>, private readonly errorMessage: string) {
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
      : { attemptedValue: value, errorMessage: this.customErrorMessage ?? this.errorMessage, propertyName: this.propertyName };
    return validationResult;
  }
}
