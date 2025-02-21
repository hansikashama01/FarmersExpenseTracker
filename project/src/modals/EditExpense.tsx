import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Expense, ExpenseCategory, UpdateExpense } from '../types/expense';

interface EditExpenseProps {
  onClose: Function;
  handleSaveEdit: Function;
  selectedExpense: Expense | null;
}

export const EditExpense: React.FC<EditExpenseProps> = ({ onClose, handleSaveEdit, selectedExpense }) => {
  const [editExpenseData, setEditExpenseData] = useState<UpdateExpense | null>(null);

  useEffect(() => {
    if (selectedExpense) {
      setEditExpenseData({
        amount: selectedExpense?.amount || 0.0,
        category: selectedExpense?.category || ExpenseCategory.FUEL,
        description: selectedExpense?.description || '',
      });
    }
  }, [selectedExpense]);

  return (
    <Modal
      visible={!!selectedExpense}
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      {editExpenseData ? (
        <View style={styles.modalContainer}>
          {/* Modern Title */}
          <Text style={styles.title}>Edit Expense</Text>

          {/* Input Fields */}
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            defaultValue={String(editExpenseData.amount)}
            onChangeText={(text) => setEditExpenseData({ ...editExpenseData, amount: parseFloat(text) })}
          />
          <Picker
            selectedValue={editExpenseData?.category}
            onValueChange={(value) => setEditExpenseData({ ...editExpenseData, category: value as ExpenseCategory })}
            style={styles.picker}
          >
            {Object.values(ExpenseCategory).map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={editExpenseData.description}
            onChangeText={(text) => setEditExpenseData({ ...editExpenseData, description: text })}
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={() => handleSaveEdit(editExpenseData)}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => onClose()}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a8f3c',
    textAlign: 'center',
    marginBottom: 30, // Space below the title
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button: {
    width: 120,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
