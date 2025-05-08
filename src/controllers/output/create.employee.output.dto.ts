import CreateEmployeeUseCaseOutput from 'src/usecases/employee/output/create.employee.usecase.output';

export default class CreateEmployeeOutputDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly birthdate: Date,
    public readonly city: string,
    public readonly state: string,
    public readonly companyId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static fromUseCaseOutput(
    data: CreateEmployeeUseCaseOutput,
  ): CreateEmployeeOutputDto {
    return new CreateEmployeeOutputDto(
      data.id,
      data.name,
      data.email,
      data.phone,
      data.birthdate,
      data.city,
      data.state,
      data.companyId,
      data.createdAt,
      data.updatedAt,
    );
  }
}
