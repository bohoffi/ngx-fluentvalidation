# ngx-fluentvalidation

- [x] base validator implementation
  - [x] set of rules for non iterable properties
  - [x] pass a validator as a rule
- [x] base rule implementation

## Check and Fix

- Restructure code in new TS lib project `ts-fluentvalidation`
- Rules
  - [ ] `setValidator` should be apllicable to all property types - not just object types

## Extension - Phase I

- Validator
  - [ ] set of rules for iterable properties
  - [ ] [Cascading of rules](https://docs.fluentvalidation.net/en/latest/cascade.html) (break on first fail)
- Rules
  - Cross-property comparison rules (add possibility to compare against another property value)
    - [ ] notEqual
    - [ ] equal
    - [ ] lessThan
    - [ ] lessThanOrEqualTo
    - [ ] greaterThan
    - [ ] greaterThanOrEqualTo
  - add `empty` rule `length` and `size` properties

## Extension - Phase II

- Validator
  - [ ] [Rule sets](https://docs.fluentvalidation.net/en/latest/rulesets.html) like in .NET
  - [ ] validate options to validate [specific subset](https://docs.fluentvalidation.net/en/latest/specific-properties.html)
  - [ ] inline validator creation

## Extension - Phase III

- Validator
  - [ ] [Async validation](https://docs.fluentvalidation.net/en/latest/async.html)
  - [ ] [Include](https://docs.fluentvalidation.net/en/latest/including-rules.html) another validator to reuse set rules

## Extension - Phase IV

- Validators
  - [ ] [Inheritance validation](https://docs.fluentvalidation.net/en/latest/inheritance.html)
- Rules
  - Conditions
    - [ ] [Otherwise](https://docs.fluentvalidation.net/en/latest/conditions.html)
