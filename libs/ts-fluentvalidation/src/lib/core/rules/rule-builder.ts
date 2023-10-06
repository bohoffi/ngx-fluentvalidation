import { AbstractArrayRuleBuilder } from './abstract-array-rule-builder';
import { AbstractRuleBuilder } from './abstract-rule-builder';

export class RuleBuilder<TModel, TProperty> extends AbstractRuleBuilder<TModel, TProperty> {
  public override getAllRules() {
    return {
      ...this.getTypeRules()
    };
  }
}

export class ArrayRuleBuilder<TModel, TProperty extends Array<unknown>> extends AbstractArrayRuleBuilder<TModel, TProperty> {
  public override getAllRules() {
    return {
      ...this.getTypeRules()
    };
  }
}
