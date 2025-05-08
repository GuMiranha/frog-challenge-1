import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import CreateEmployeeUseCaseInput from 'src/usecases/employee/input/create.employee.usecase.input';
import { IsPhoneBR } from '../../domain/validators/phone-br.validator';

export default class CreateEmployeeInputDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsPhoneBR()
  @IsNotEmpty()
  phone!: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birthdate!: Date;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsNumber()
  @Min(1)
  companyId!: number;

  toUseCaseInput(): CreateEmployeeUseCaseInput {
    return new CreateEmployeeUseCaseInput(
      this.name,
      this.email,
      this.phone,
      this.birthdate,
      this.city,
      this.state,
      this.companyId,
    );
  }
}
