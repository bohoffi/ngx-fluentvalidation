# ts-fluentvalidation

## Credits

The implementation of the rule builders is heavyly inspired and based on [fluentvalidation-ts](https://github.com/AlexJPotter/fluentvalidation-ts) 🙏🏼 🙇

## Roadmap

### Initial

- [x] base validator implementation
  - [x] set of rules for non iterable properties
  - [x] pass a validator as a rule
- [x] base rule implementation
- [x] Restructure code in new TS lib project `ts-fluentvalidation`

### Phase I

- Validator
  - [x] set of rules for iterable properties (#9)
  - [x] [Cascading of rules](https://docs.fluentvalidation.net/en/latest/cascade.html) (break on first fail) (#7)
- Rules
  - Cross-property comparison rules (add possibility to compare against another property value) (#8)
    - [x] notEqual
    - [x] equal
    - [x] lessThan
    - [x] lessThanOrEqualTo
    - [x] greaterThan
    - [x] greaterThanOrEqualTo
  - [x] Expand support for `empty` validation (#10)

### Extension - Phase II

- Validator
  - [ ] validate options to validate [specific subset](https://docs.fluentvalidation.net/en/latest/specific-properties.html)
- Rules
  - [ ] Custom rules defined outside of the library

### Extension - Phase III

- Validator
  - [ ] [Async validation](https://docs.fluentvalidation.net/en/latest/async.html)

### Extension - Phase IV

- Validators
  - [ ] [Inheritance validation](https://docs.fluentvalidation.net/en/latest/inheritance.html)
  - [ ] [Include](https://docs.fluentvalidation.net/en/latest/including-rules.html) another validator to reuse set rules
- Rules
  - Conditions
    - [ ] [Otherwise](https://docs.fluentvalidation.net/en/latest/conditions.html)
  - [ ] [Rule sets](https://docs.fluentvalidation.net/en/latest/rulesets.html) like in .NET

### Further updates

- Rules
  - [ ] `setValidator` should be apllicable to all property types - not just object types
