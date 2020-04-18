import { uuid } from 'uuidv4';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: Request): Transaction {
    if (data.type !== 'outcome' && data.type !== 'income') {
      throw Error('The type of transaction should be income or outcome');
    }

    const balance = this.transactionsRepository.getBalance();

    if (data.type === 'outcome' && data.value > balance.total) {
      throw Error(
        'The value of the transaction is greater than the total balance',
      );
    }

    const transaction = this.transactionsRepository.create({
      title: data.title,
      value: data.value,
      type: data.type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
