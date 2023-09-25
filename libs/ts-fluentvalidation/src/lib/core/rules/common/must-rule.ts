import { PropertyRule } from '../property-rule';

export class MustRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly predicate: (value: TProperty | null | undefined, model: TModel) => boolean) {
    super((value, model) => this.predicate(value, model), 'The specified condition was not met');
  }
}
