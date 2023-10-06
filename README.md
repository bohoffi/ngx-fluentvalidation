# NgxFluentvalidation + ts-fluentvalidation

Home of `ngx-fluentvalidation` - an Angular wrapper around a fluent validation library - and `ts-fluentvalidation` - the aforementioned fluent validation library.

The combination of this two library will help to reduce boilerplate code when implementing validations in general and forms validation in Angular in a reusable manner.

## Usage

### Creating a validator

```ts
// the shown code is subject to change

interface ShippingInformation {
  company?: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

class ShippingInformationValidator extends ModelValidator<ShippingInformation> {
  constructor() {
    super();

    this.for('firstName').notNull().notEmpty();
    this.for('lastName')
      .notNull()
      .notEmpty()
      .notEqual(model => model.firstName);
    this.for('address').notNull().notEmpty();
    this.for('city').notNull().notEmpty();
    this.for('state').notNull().notEmpty();
    this.for('postalCode').notNull().minLength(5);
  }
}

const model: ShippingInformation = {
  firstName: 'John',
  lastName: 'Doe',
  address: '1st Avenue',
  city: 'New York City',
  state: 'New York',
  postalCode: '10009'
};

const validator = new ShippingInformationValidator();
const isValid = validator.validate(model);
```

### Applying validator to form

```ts
// the shown code is subject to change

type TypedFormControls<T extends Record<any, any>> = {
  [K in keyof T]-?: T[K] extends Array<infer R>
    ? FormArray<R extends Record<any, any> ? FormGroup<TypedFormControls<R>> : FormControl<R>>
    : T[K] extends Record<any, any>
    ? FormGroup<TypedFormControls<T[K]>>
    : FormControl<T[K]>;
};

type ShippingInformationForm = TypedFormControls<ShippingInformation>;

const formGroup: FormGroup<ShippingInformationForm> = new FormGroup<ShippingInformationForm>({
  company: new FormControl<string | undefined>(undefined, { nonNullable: true }),
  firstName: new FormControl<string>('', { nonNullable: true }),
  lastName: new FormControl<string>('', { nonNullable: true }),
  address: new FormControl<string>('', { nonNullable: true }),
  city: new FormControl<string>('', { nonNullable: true }),
  state: new FormControl<string>('', { nonNullable: true }),
  postalCode: new FormControl<string>('', { nonNullable: true })
});

// this will set the control validators according to the defined rules
applyFluentValidator(formGroup, new ShippingInformationValidator());
```

## Further documentation

- ### [ngx-fluentvalidation](libs/ngx-fluentvalidation/README.md)
- ### [ts-fluentvalidation](libs/ts-fluentvalidation/README.md)
