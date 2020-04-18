import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((sum, curr) => {
        return sum + curr.value;
      }, 0);

    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((sum, curr) => {
        return sum + curr.value;
      }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create(data: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title: data.title,
      value: data.value,
      type: data.type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
