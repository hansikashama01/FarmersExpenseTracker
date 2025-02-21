import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ExpenseCategory } from '../types/expense';

interface ExpenseFormProps {
  onSubmit: (expense: {
    amount: number;
    category: ExpenseCategory;
    description: string;
  }) => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory | null>(null);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{
    amount?: string;
    category?: string;
    description?: string;
  }>({});

  const validate = () => {
    const newErrors: { amount?: string; category?: string; description?: string } = {};
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount.';
    }
    if (!category) {
      newErrors.category = 'Please select a category.';
    }
    if (!description) {
      newErrors.description = 'Please provide a description.';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      amount: parseFloat(amount),
      category: category as ExpenseCategory,
      description,
    });
    setAmount('');
    setCategory(null);
    setDescription('');
    setErrors({});
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Add New Expense</Text>

      {/* Amount Input */}
      <TextInput
        style={[styles.input, errors.amount ? styles.inputError : {}]}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

      {/* Category Picker */}
      <View style={[styles.input, styles.pickerContainer, errors.category ? styles.inputError : {}]}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value as ExpenseCategory)}
          style={styles.picker}
        >
          <Picker.Item label="Select a category" value={null} color="#aaa" />
          {Object.values(ExpenseCategory).map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

      {/* Description Input */}
      <TextInput
        style={[styles.input, errors.description ? styles.inputError : {}]}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  pickerContainer: {
    justifyContent: 'center',
    padding: 0,
    borderRadius:8
  },
  picker: {
    height: '100%',
    color: '#333',
    borderRadius:8
    
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
