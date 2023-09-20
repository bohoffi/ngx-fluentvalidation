import { HasLengthRule } from './has-length-rule';

describe(HasLengthRule.name, () => {
  it('`validate` should return `true` if value fulfills the rule', () => {
    const sut = 'Hello';
    const rule = new HasLengthRule<string>({ minLength: 3, maxLength: 5 });

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(true);
    expect(rule.validationFailure).toBeNull();
  });

  it('`validate` should return `false` and contains a failure if value does not fulfill the rule', () => {
    const sut = 'Hello-World';
    const refValue = { minLength: 3, maxLength: 5 };
    const rule = new HasLengthRule<string>(refValue);

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(false);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut);
    expect(ruleFailure?.errorMessage).toEqual(
      `Value does not satisfy minimum length of '${refValue.minLength}' and/or maximum length of '${refValue.maxLength}'.`
    );
  });
});
