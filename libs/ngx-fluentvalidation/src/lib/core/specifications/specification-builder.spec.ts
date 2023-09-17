// import { StringHasMinLengthSpecification, StringIsNotEmptySpecification } from '../../base/string-specification';
// import { StringSpecificationBuilder } from './specification-builder';

// describe('SpecificationBuilder', () => {
//   describe('StringSpecificationBuilder', () => {
//     describe('with condition', () => {
//       const builder = new StringSpecificationBuilder().with(new StringHasMinLengthSpecification(3));
//       it('as specification', () => {
//         builder.when(new StringIsNotEmptySpecification());

//         const spec = builder.build();
//         expect(spec.isSatisfiedBy('')).toBe(true);
//         expect(spec.isSatisfiedBy('ABC')).toBe(true);
//         expect(spec.isSatisfiedBy('A')).toBe(false);
//       });

//       it('as expression', () => {
//         builder.when(x => x !== '');

//         const spec = builder.build();
//         expect(spec.isSatisfiedBy('')).toBe(true);
//         expect(spec.isSatisfiedBy('ABC')).toBe(true);
//         expect(spec.isSatisfiedBy('A')).toBe(false);
//       });
//     });
//   });
// });
