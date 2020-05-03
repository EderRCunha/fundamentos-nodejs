import Transaction from '../models/Transaction';
import Balance from '../models/Balance';
/*
interface Balance {
  income: number;
  outcome: number;
  total: number;
}
*/
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const balance = new Balance({ income: 0, outcome: 0, total: 0 });

    if (this.transactions) {
      const incomes = this.transactions.filter(
        transaction => transaction.type === 'income',
      );

      balance.income = incomes.reduce((sum, transaction) => {
        return sum + transaction.value;
      }, 0);

      const outcomes = this.transactions.filter(
        transaction => transaction.type === 'outcome',
      );

      balance.outcome = outcomes.reduce((sum, transaction) => {
        return sum + transaction.value;
      }, 0);

      balance.total = balance.income - balance.outcome;
    }

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
