import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, Text, TextInput, Button } from 'react-native';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { ExpenseChart } from '../components/ExpenseChart';
import { Expense, ExpenseCategory, UpdateExpense } from '../types/expense';
import { EditExpense } from '../modals/EditExpense';

const API_URL = "http://localhost:5000/api/expenses";

export const HomeScreen = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const handleAddExpense = async (expenseData: {
    amount: number;
    category: ExpenseCategory;
    description: string;
  }) => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const localDate = new Date();
      const localISOString = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();

      const raw = JSON.stringify({
        "category": expenseData.category,
        "amount": expenseData.amount,
        "date": localISOString,
        "description": expenseData.description
      });

      const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: raw,
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await fetchData();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const result = await response.json();

      if (Array.isArray(result)) {
        setExpenses(result.map((item: any) => ({
          id: item?.id,
          amount: parseFloat(item?.amount) || 0.00, // handle NaN if parsing fails
          category: item?.category || '', // handle undefined category
          description: item?.description || '', // handle undefined description
          date: item?.date ? new Date(item?.date) : new Date(), // handle invalid date
        })));
      } else {
        console.error("Expected an array, but received:", result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const deleteExpense = async (expenseId: string) => {
    try {
      const response = await fetch(`${API_URL}/${expenseId}`, {
        method: "DELETE",
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await fetchData();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const editExpense = async (expenseId: string, expenseData: {
    amount: number;
    category: ExpenseCategory;
    description: string;
  }) => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "category": expenseData.category,
        "amount": expenseData.amount,
        "description": expenseData.description
      });

      const response = await fetch(`${API_URL}/${expenseId}`, {
        method: "PUT",
        headers: headers,
        body: raw,
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await fetchData();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSaveEdit = (updatedExpence: UpdateExpense) => {
    if (selectedExpense) {
      editExpense(selectedExpense.id, updatedExpence);
      setSelectedExpense(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ExpenseForm onSubmit={handleAddExpense} />
      <ExpenseChart expenses={expenses} />
      <ExpenseList
        expenses={expenses}
        onEdit={(expense: Expense) => setSelectedExpense(expense)}
        onDelete={(expenseId: string) => deleteExpense(expenseId)}
      />
      {<EditExpense
        handleSaveEdit={handleSaveEdit}
        onClose={() => setSelectedExpense(null)}
        selectedExpense={selectedExpense}
      />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
