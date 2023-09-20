import { LessThanOrEqualRule } from './less-than-or-equal-rule';

describe(LessThanOrEqualRule.name, () => {
  it('`validate` should return `true` if value fulfills the rule', () => {
    const sut = 5;
    const rule = new LessThanOrEqualRule(5);

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(true);
    expect(rule.validationFailure).toBeNull();
  });

  it('`validate` should return `false` and contains a failure if value does not fulfill the rule', () => {
    const sut = 6;
    const refValue = 5;
    const rule = new LessThanOrEqualRule(refValue);

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(false);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut);
    expect(ruleFailure?.errorMessage).toEqual(`Value must be less than or equal to '${refValue}'.`);
  });
});
