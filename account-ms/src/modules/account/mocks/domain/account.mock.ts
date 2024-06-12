import { AccountModel } from '@account/domain/models';
import { faker } from '@faker-js/faker';

export const mockAccount = (data?: Partial<AccountModel>): AccountModel => {
  const mock: AccountModel = {
    id: faker.number.int(),
    name: faker.internet.displayName(),
    cpf: faker.number.int().toString(),
    password: faker.internet.password(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    deletedAt: faker.date.anytime(),
  };

  if (data) {
    Object.assign(mock, data);
  }

  return mock;
};
