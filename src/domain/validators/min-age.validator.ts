import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function MinAge(age: number, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'minAge',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [age],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const constraints = args.constraints as number[];
          const [minAge] = constraints;
          const birthdate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthdate.getFullYear();
          const monthDiff = today.getMonth() - birthdate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthdate.getDate())
          ) {
            return age - 1 >= minAge;
          }

          return age >= minAge;
        },
      },
    });
  };
}
