import Employee from 'src/domain/entities/employee.entity';

export default interface IEmployeeRepository {
  create(data: Partial<Employee>): Promise<Employee>;
  findById(id: number): Promise<Employee | null>;
  findByCompanyId(companyId: number): Promise<Employee[]>;
  findOne(data: Partial<Employee>): Promise<Employee | null>;
  findAll(): Promise<Employee[]>;
  update(id: number, data: Partial<Employee>): Promise<Employee | null>;
  delete(id: number): Promise<void>;
}
