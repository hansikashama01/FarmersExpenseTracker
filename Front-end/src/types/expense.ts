export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
}

export interface UpdateExpense {
  amount: number;
  category: ExpenseCategory;
  description: string;
}

export enum ExpenseCategory {
  SEEDS = 'Seeds',
  LABOR = 'Labor',
  MACHINERY = 'Machinery',
  FERTILIZER = 'Fertilizer',
  PESTICIDES = 'Pesticides',
  FUEL = 'Fuel',
  OTHER = 'Other'
}