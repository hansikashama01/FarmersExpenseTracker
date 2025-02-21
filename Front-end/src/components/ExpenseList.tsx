import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Expense } from '../types/expense';
import { ExpenseListItem } from './ExpenseListItem';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void; // Callback for editing
  onDelete: (expenseId: string) => void; // Callback for deleting
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => (
        <ExpenseListItem
          expense={item}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
