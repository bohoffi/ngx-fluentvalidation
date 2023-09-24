import { IsNotNullRule } from './is-not-null-rule';

describe(IsNotNullRule.name, () => {
  it('`validate` should return `true` if value fulfills the rule', () => {
    const sut = {
      stringProperty: 'Hello.World'
    };
    const rule = new IsNotNullRule<typeof sut, (typeof sut)['stringProperty']>();

    const ruleResult = rule.validate(sut.stringProperty, sut);
    expect(ruleResult).toBe(true);
    expect(rule.validationFailure).toBeNull();
  });

  it('`validate` should return `false` and contains a failure if value does not fulfill the rule', () => {
    const sut = { stringProperty: null };
    const rule = new IsNotNullRule<typeof sut, (typeof sut)['stringProperty']>();

    const ruleResult = rule.validate(sut.stringProperty, sut);
    expect(ruleResult).toBe(false);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut.stringProperty);
    expect(ruleFailure?.errorMessage).toEqual('Value should not be null.');
  });
});
