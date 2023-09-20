import { AbstractRule } from '../../../core/rules/abstract-rule';

// using the Luhn algorythm
export class CreditCardRule extends AbstractRule<string> {
  constructor() {
    super('Value is not a valid credit card number.', value => this.validateInternal(value));
  }

  private validateInternal(candidate: string): boolean {
    if (candidate === null) {
      return true;
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
