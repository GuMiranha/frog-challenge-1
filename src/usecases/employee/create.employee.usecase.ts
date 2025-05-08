import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import CreateEmployeeUseCaseInput from './input/create.employee.usecase.input';
import CreateEmployeeUseCaseOutput from './output/create.employee.usecase.output';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  EmployeeRepositoryToken,
  CompanyRepositoryToken,
} from 'src/app.tokens';
import IEmployeeRepository from 'src/domain/interfaces/repositories/employee.repository.interface';
import ICompanyRepository from 'src/domain/interfaces/repositories/company.repository.interface';

@Injectable()
export default class CreateEmployeeUseCase
  implements IUseCase<CreateEmployeeUseCaseInput, CreateEmployeeUseCaseOutput>
{
  constructor(
    @Inject(EmployeeRepositoryToken)
    private readonly employeeRepository: IEmployeeRepository,
    @Inject(CompanyRepositoryToken)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async run(
    input: CreateEmployeeUseCaseInput,
  ): Promise<CreateEmployeeUseCaseOutput> {
    const company = await this.companyRepository.findById(input.companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const employeeAlreadyExists = await this.employeeRepository.findOne({
      email: input.email,
    });

    if (employeeAlreadyExists) {
      throw new BadRequestException('Employee already exists');
    }

    const birthdate = new Date(input.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      throw new BadRequestException('Employee is under 18 years old');
    }

    return this.employeeRepository.create({
      ...input,
      birthdate,
    });
  }
}
