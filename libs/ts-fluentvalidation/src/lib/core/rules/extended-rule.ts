import { ConditionalRule } from './conditional-rule';

export class ExtendedRule<TModel> extends ConditionalRule<TModel> {
  protected propertyName?: string;
  protected customErrorMessage?: string;

  public withPropertyName(propertyName?: string): void {
    this.propertyName = propertyName;
  }

  public withCustomMessage(customMessage: string): void {
    this.customErrorMessage = customMessage;
  }
}
