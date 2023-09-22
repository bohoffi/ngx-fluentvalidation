import { TypeValidator } from '../type-validators';

abstract class AbstractValidatorBuilder<TModel, TProperty> {
  protected getTypeRules() {
    return {
      ...this.getCommonRules(),
      ...this.getStringRules(),
      ...this.getNumberRules(),
      ...this.getObjectRules()
    };
  }

  public abstract getAllRules(): object;

  private getRulesWithExtensionsAndConditions() {
    return {
      ...this.getAllRules(),
      withMessage: this.withMessage,
      when: this.when,
      unless: this.unless
    };
  }

  private getCommonRules() {
    return {
      isNull: this.isNull,
      notNull: this.notNull,
      equal: this.equal,
      notEqual: this.notEqual
    };
  }

  private getStringRules() {
    return {
      notEmpty: this.notEmpty
    };
  }

  private getNumberRules() {
    return {
      isPositive: this.isPositive
    };
  }

  private getObjectRules() {
    return {
      setValidator: this.setValidator
    };
  }

  // extensions
  public withMessage(message: string) {
    // TODO apply message
    return {
      ...this.getAllRules(),
      when: this.when,
      unless: this.unless
    };
  }

  // conditions
  public when(condition: (model: TModel) => boolean) {
    // TODO apply condition
    return this.getAllRules();
  }
  public unless(condition: (model: TModel) => boolean) {
    // TODO apply condition
    return this.getAllRules();
  }

  // common rules
  private isNull() {
    // TODO push rule
    return this.getRulesWithExtensionsAndConditions();
  }
  private notNull() {
    // TODO push rule
    return this.getRulesWithExtensionsAndConditions();
  }
  private equal(referenceValue: TProperty) {
    // TODO push rule
    return this.getRulesWithExtensionsAndConditions();
  }
  private notEqual(referenceValue: TProperty) {
    // TODO push rule
    return this.getRulesWithExtensionsAndConditions();
  }

  // string rules
  private notEmpty() {
    // TODO push rule
    return this.getRulesWithExtensionsAndConditions();
  }

  // number rules
  private isPositive() {
    // TODO push rule
    return this.getRulesWithExtensionsAndConditions();
  }

  // object rules
  private setValidator() {
    // TODO push rule
    return this.getRulesWithExtensionsAndConditions();
  }
}

export class ValidationBuilder<TModel, TProperty> extends AbstractValidatorBuilder<TModel, TProperty> {
  public override getAllRules(): object {
    return {
      ...this.getTypeRules()
    };
  }
}

interface Person {
  name: string;
  age: number;
  address: {
    street: string;
  };
}

const personNameBuilder = new ValidationBuilder<Person, string>().getAllRules() as TypeValidator<Person, string>;
