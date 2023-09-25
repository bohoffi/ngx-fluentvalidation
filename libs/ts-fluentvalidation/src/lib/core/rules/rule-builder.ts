import { AbstractRuleBuilder } from './abstract-rule-builder';

export class RuleBuilder<TModel, TProperty> extends AbstractRuleBuilder<TModel, TProperty> {
  public override getAllRules() {
    return {
      ...this.getTypeRules()
    };
  }
}
