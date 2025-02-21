import { Expense } from '../types/expense';

export const prepareChartData = (expenses: Expense[]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    return {
      label: months[monthIndex],
      monthIndex
    };
  }).reverse();

  const data = last6Months.map(({ monthIndex }) => {
    return expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === monthIndex;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  });

  return {
    labels: last6Months.map(m => m.label),
    datasets: [{ data }]
  };
};