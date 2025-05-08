import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Company from '../domain/entities/company.entity';
import Employee from '../domain/entities/employee.entity';

@Controller('company')
export class CompanyController {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  @Post()
  async createCompany(@Body() company: Company) {
    const existingCompany = await this.companyRepository.findOne({
      where: { cnpj: company.cnpj },
    });

    if (existingCompany) {
      throw new BadRequestException('Empresa com este CNPJ já existe');
    }

    return this.companyRepository.save(company);
  }

  @Get(':companyId/employees')
  async getCompanyEmployees(@Param('companyId') companyId: number) {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return this.employeeRepository.find({
      where: { companyId: companyId },
    });
  }
}
