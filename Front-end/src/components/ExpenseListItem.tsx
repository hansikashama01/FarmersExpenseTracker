import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import { Expense } from '../types/expense';
import { formatDate } from '../utils/dateUtils';

interface ExpenseListItemProps {
  expense: Expense;
  onEdit: () => void; // Callback for editing
  onDelete: () => void; // Callback for deleting
}

export const ExpenseListItem: React.FC<ExpenseListItemProps> = ({ expense, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = () => {
    onDelete(); // Call the delete callback
    setIsModalVisible(false); // Close the modal after deletion
  };

  return (
    <View>
      {/* Expense Item */}
      <View style={styles.container}>
        <View style={styles.details}>
          {/* Category */}
          <Text style={styles.category}>{expense.category}</Text>

          {/* Date */}
          <Text style={styles.date}>{expense.date ? formatDate(expense.date) : ''}</Text>

          {/* Amount */}
          <Text style={styles.amount}>LKR {expense.amount?.toFixed(2)}</Text>

          {/* Description */}
          {expense.description && (
            <Text style={styles.description}>{expense.description}</Text>
          )}
        </View>

        <View style={styles.actions}>
          {/* Edit Icon */}
          <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
            <Icon name="edit" size={24} color="#4CAF50" />
          </TouchableOpacity>

          {/* Delete Icon */}
          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.iconButton}>
            <Icon name="delete" size={24} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)} // Close modal on back button press
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalMessage}>Do you really want to delete this expense?</Text>

            <View style={styles.modalActions}>
              {/* Cancel Button */}
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>

              {/* Confirm Button */}
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 7,
  },
  details: {
    flex: 1,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    borderRadius: 5,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
