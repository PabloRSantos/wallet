import { Exclude } from 'class-transformer';

export class AccountModel {
  id?: number;
  name: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  @Exclude()
  password: string;
}
