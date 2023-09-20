import { CreditCardRule } from './credit-card-rule';

describe(CreditCardRule.name, () => {
  it('`validate` should return `true` if value fulfills the rule', () => {
    const sut = '5105105105105100';
    const rule = new CreditCardRule();

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(true);
    expect(rule.validationFailure).toBeNull();
  });

  it('`validate` should return `false` and contains a failure if value does not fulfill the rule', () => {
    const sut = '5105105105105196';
    const rule = new CreditCardRule();

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(false);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut);
    expect(ruleFailure?.errorMessage).toEqual('Value is not a valid credit card number.');
  });
});
