import {
  Controller,
  Post,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Employee from '../domain/entities/employee.entity';
import Company from '../domain/entities/company.entity';

interface CreateEmployeeData {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  city: string;
  state: string;
  companyId: number;
}

@Controller('employee')
export class EmployeeController {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  @Post()
  async createEmployee(
    @Body() employeeData: CreateEmployeeData,
  ): Promise<Employee> {
    const company = await this.companyRepository.findOne({
      where: { id: employeeData.companyId },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const existingEmployee = await this.employeeRepository.findOne({
      where: { email: employeeData.email },
    });

    if (existingEmployee) {
      throw new BadRequestException('Funcionário com este email já existe');
    }

    const employee = {
      ...employeeData,
      birthdate: new Date(employeeData.birthdate),
    };

    return this.employeeRepository.save(employee);
  }
}
