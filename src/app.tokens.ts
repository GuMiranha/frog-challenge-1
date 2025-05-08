// USECASES

export const CreateCompanyUseCaseToken = Symbol('CreateCompanyUseCase');
export const CreateEmployeeUseCaseToken = Symbol('CreateEmployeeUseCase');

export const USECASES = {
  CREATE_USER: Symbol('CREATE_USER'),
  FIND_USER: Symbol('FIND_USER'),
  UPDATE_USER: Symbol('UPDATE_USER'),
  DELETE_USER: Symbol('DELETE_USER'),
};

// REPOSITORIES

export const CompanyRepositoryToken = Symbol('CompanyRepository');
export const EmployeeRepositoryToken = Symbol('EmployeeRepository');

export const REPOSITORIES = {
  USER_REPOSITORY: Symbol('USER_REPOSITORY'),
};
