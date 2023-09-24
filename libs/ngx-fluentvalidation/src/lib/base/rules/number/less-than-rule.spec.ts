import { LessThanRule } from './less-than-rule';

interface Sut {
  value: number;
}

describe(LessThanRule.name, () => {
  it('`validate` should return `true` if value fulfills the rule', () => {
    const sut: Sut = {
      value: 4
    };
    const rule = new LessThanRule<Sut, Sut['value']>(5);

    const ruleResult = rule.validate(sut.value, sut);
    expect(ruleResult).toBe(true);
    expect(rule.validationFailure).toBeNull();
  });

  it('`validate` should return `false` and contains a failure if value does not fulfill the rule', () => {
    const sut: Sut = {
      value: 5
    };
    const refValue = 5;
    const rule = new LessThanRule<Sut, Sut['value']>(refValue);

    const ruleResult = rule.validate(sut.value, sut);
    expect(ruleResult).toBe(false);
    const ruleFailure = rule.validationFailure;
    expect(ruleFailure).not.toBeNull();
    expect(ruleFailure?.attemptedValue).toEqual(sut);
    expect(ruleFailure?.errorMessage).toEqual(`Value must be less than '${refValue}'.`);
  });
});
