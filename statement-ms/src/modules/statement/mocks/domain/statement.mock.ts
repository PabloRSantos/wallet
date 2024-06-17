import { faker } from '@faker-js/faker';
import { StatementModel } from '@statement/domain/models';

export const mockStatement = (
  data?: Partial<StatementModel>,
): StatementModel => {
  const mock: StatementModel = {
    id: faker.number.int(),
    accountId: faker.number.int(),
    transactionId: faker.string.uuid(),
    operation: faker.lorem.slug(),
    amount: faker.number.int(),
    balance: faker.number.int(),
    createdAt: faker.date.anytime(),
  };

  if (data) {
    Object.assign(mock, data);
  }

  return mock;
};
