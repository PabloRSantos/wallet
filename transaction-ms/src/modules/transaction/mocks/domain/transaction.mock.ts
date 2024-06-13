import { faker } from '@faker-js/faker';
import {
  TransactionModel,
  TransactionOperationEnum,
} from '@transaction/domain/models';

export const mockTransaction = (
  data?: Partial<TransactionModel>,
): TransactionModel => {
  const mock: TransactionModel = {
    id: faker.string.uuid(),
    accountId: faker.number.int(),
    operation: faker.helpers.enumValue(TransactionOperationEnum),
    amount: faker.number.int(),
    parentId: faker.string.uuid(),
    createdAt: faker.date.anytime(),
  };

  if (data) {
    Object.assign(mock, data);
  }

  return mock;
};
