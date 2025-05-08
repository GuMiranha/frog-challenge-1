import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntity from './base.entity';
import { IsEmail, IsString, IsDate } from 'class-validator';
import { IsPhoneBR } from '../validators/phone-br.validator';
import Company from './company.entity';
import { MinAge } from '../validators/min-age.validator';

@Entity()
export default class Employee extends BaseEntity {
  @Column()
  @IsString()
  name!: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @IsPhoneBR()
  phone!: string;

  @Column()
  @IsDate()
  @MinAge(18)
  birthdate!: Date;

  @Column()
  @IsString()
  city!: string;

  @Column()
  @IsString()
  state!: string;

  @Column()
  companyId!: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company!: Company;
}
