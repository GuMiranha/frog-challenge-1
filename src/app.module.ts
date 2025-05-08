import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './controllers/company.controller';
import { EmployeeController } from './controllers/employee.controller';
import Company from './domain/entities/company.entity';
import Employee from './domain/entities/employee.entity';
import {
  CompanyRepositoryToken,
  CreateCompanyUseCaseToken,
  EmployeeRepositoryToken,
  CreateEmployeeUseCaseToken,
} from './app.tokens';
import CreateCompanyUseCase from './usecases/company/create.company.usecase';
import CreateEmployeeUseCase from './usecases/employee/create.employee.usecase';
import CompanyRepository from './external/repository/company.repository';
import EmployeeRepository from './external/repository/employee.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      entities: [Company, Employee],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Company, Employee]),
  ],
  controllers: [CompanyController, EmployeeController],
  providers: [
    {
      provide: CreateCompanyUseCaseToken,
      useClass: CreateCompanyUseCase,
    },
    {
      provide: CreateEmployeeUseCaseToken,
      useClass: CreateEmployeeUseCase,
    },
    {
      provide: CompanyRepositoryToken,
      useClass: CompanyRepository,
    },
    {
      provide: EmployeeRepositoryToken,
      useClass: EmployeeRepository,
    },
  ],
})
export class AppModule {}
