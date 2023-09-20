import { HasMaxLengthRule } from './has-max-length-rule';

describe(HasMaxLengthRule.name, () => {
  it('`validate` should return `true` if value fulfills the rule', () => {
    const sut = 'Hello.World';
    const rule = new HasMaxLengthRule<string>(11);

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(true);
    expect(rule.validationFailure).toBeNull();
  });

  it('`validate` should return `false` and contains a failure if value does not fulfill the rule', () => {
    const sut = 'Hello-World';
    const refValue = 10;
    const rule = new HasMaxLengthRule<string>(refValue);

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(false);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut);
    expect(ruleFailure?.errorMessage).toEqual(`Value does not satisfy maximum length of '${refValue}'.`);
  });
});
