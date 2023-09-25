import { PropertyRule } from '../property-rule';

// using the Luhn algorythm
export class CreditCardRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => this.validateInternal(value), 'Value is not a valid credit card number.');
  }

  private validateInternal(candidate: TProperty | null | undefined): boolean | null {
    if (typeof candidate !== 'string') {
      return null;
    }
    // Remove whitespace and other characters from the input
    const trimmedNumber = candidate.replace(/\s+/g, '');

    // Check if the input consists of digits only
    if (!/^\d+$/.test(trimmedNumber)) {
      return false;
    }

    let sum = 0;
    let double = false;

    // Start from the right-most digit and process each digit
    for (let i = trimmedNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(trimmedNumber.charAt(i), 10);

      if (double) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      double = !double;
    }

    // If the sum is divisible by 10, it's a valid credit card number
    return sum % 10 === 0;
  }
}
