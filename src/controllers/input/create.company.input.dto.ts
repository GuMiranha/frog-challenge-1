import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import CreateCompanyUseCaseInput from 'src/usecases/company/input/create.company.usecase.input';

export default class CreateCompanyInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  @IsNumberString()
  cnpj: string;

  constructor(name: string = '', email: string = '', cnpj: string = '') {
    this.name = name;
    this.email = email;
    this.cnpj = cnpj;
  }

  toUseCaseInput(): CreateCompanyUseCaseInput {
    return new CreateCompanyUseCaseInput(this.name, this.email, this.cnpj);
  }
}
