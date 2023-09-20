import { IsNegativeRule } from './is-negative-rule';

describe(IsNegativeRule.name, () => {
  it('`validate` should return `true` if value fulfills the rule', () => {
    const sut = -1;
    const rule = new IsNegativeRule();

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(true);
    expect(rule.validationFailure).toBeNull();
  });

  it('`validate` should return `false` and contains a failure if value does not fulfill the rule', () => {
    const sut = 0;
    const rule = new IsNegativeRule();

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(false);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut);
    expect(ruleFailure?.errorMessage).toEqual('Value must be less than 0.');
  });
});
