import { ExclusiveBetweenRule } from './exclusive-between-rule';

describe(ExclusiveBetweenRule.name, () => {
  it('`validate` should return `true` if value fulfills the rule', () => {
    const sut = 4;
    const rule = new ExclusiveBetweenRule({ min: 3, max: 5 });

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(true);
    expect(rule.validationFailure).toBeNull();
  });

  it('`validate` should return `false` and contains a failure if value does not fulfill the rule', () => {
    const sut = 3;
    const refValue = { min: 3, max: 5 };
    const rule = new ExclusiveBetweenRule(refValue);

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(false);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut);
    expect(ruleFailure?.errorMessage).toEqual(`Value must be greater than '${refValue.min}' and less than '${refValue.max}'.`);
  });
});
