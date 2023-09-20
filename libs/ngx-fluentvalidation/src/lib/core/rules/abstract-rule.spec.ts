import { AbstractRule } from './abstract-rule';

const errorMessage = `Value should be '1'.`;
class SimpleRule extends AbstractRule<number> {
  constructor() {
    super(errorMessage, value => value === 1);
  }
}

describe(AbstractRule.name, () => {
  it('`validate` should return `true` if value fulfills the rule', () => {
    const sut = 1;
    const rule = new SimpleRule();

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(true);
    expect(rule.validationFailure).toBeNull();
  });

  it('`validate` should return `false` and contains a failure if value does not fulfill the rule', () => {
    const sut = 2;
    const rule = new SimpleRule();

    const ruleResult = rule.validate(sut);
    expect(ruleResult).toBe(false);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut);
    expect(ruleFailure?.errorMessage).toEqual(errorMessage);
    expect(ruleFailure?.propertyName).toBeUndefined();
  });

  it('`validationFailure` should contain the given property name when set', () => {
    const sut = 2;
    const propertyName = 'REF_VALUE';
    const rule = new SimpleRule().withPropertyName(propertyName);

    rule.validate(sut);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut);
    expect(ruleFailure?.errorMessage).toEqual(errorMessage);
    expect(ruleFailure?.propertyName).toEqual(propertyName);
  });
});
