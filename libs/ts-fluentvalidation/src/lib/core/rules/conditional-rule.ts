export class ConditionalRule<TModel> {
  protected when: ((model: TModel) => boolean) | null = null;
  protected unless: ((model: TModel) => boolean) | null = null;

  public withWhenCondition(condition: (model: TModel) => boolean): void {
    this.when = condition;
  }

  public withUnlessCondition(condition: (model: TModel) => boolean): void {
    this.unless = condition;
  }
}
