import { IsNullRule } from './is-null-rule';

describe(IsNullRule.name, () => {
  it('`validate` should return `true` if value fulfills the rule', () => {
    const sut = null;
    const rule = new IsNullRule<string>();

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(true);
    expect(rule.validationFailure).toBeNull();
  });

  it('`validate` should return `false` and contains a failure if value does not fulfill the rule', () => {
    const sut = 'Hello.World';
    const rule = new IsNullRule<string>();

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(false);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut);
    expect(ruleFailure?.errorMessage).toEqual('Value should be null.');
  });
});
