import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPhoneBR(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneBR',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          const cleaned = value.replace(/\D/g, '');
          return /^55\d{10,11}$/.test(cleaned) || /^0?\d{10,11}$/.test(cleaned);
        },
        defaultMessage() {
          return 'O número de telefone deve ser válido no formato brasileiro, com ou sem +55.';
        },
      },
    });
  };
}
