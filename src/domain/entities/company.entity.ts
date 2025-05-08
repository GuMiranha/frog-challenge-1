import { Column, Entity } from 'typeorm';
import BaseEntity from './base.entity';
import { IsEmail, IsNumber, IsString } from 'class-validator';

@Entity()
export default class Company extends BaseEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsNumber()
  cnpj: string;

  constructor(name: string = '', email: string = '', cnpj: string = '') {
    super();
    this.name = name;
    this.email = email;
    this.cnpj = cnpj;
  }
}
