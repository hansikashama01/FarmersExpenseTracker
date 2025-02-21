const express = require('express');
const router = express.Router();
const db = require('../db_config');

// Helper function to validate and format date (YYYY-MM-DD)
const formatDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) {
    throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
  }
  return date; // Return the date as is
};

// Get all expenses
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM expenses';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err.message);
      return res.status(500).json({ error: 'Failed to fetch expenses.' });
    }
    res.json(results);
  });
});

// Add an expense
router.post('/', (req, res) => {
  const { category, date, amount } = req.body;

  // Validate inputs
  if (!category || !amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Category and a valid amount are required.' });
  }
  if (!date) {
    return res.status(400).json({ error: 'Date is required in YYYY-MM-DD format.' });
  }

  try {
    const expenseDate = formatDate(date);
    const sql = 'INSERT INTO expenses (category, date, amount) VALUES (?, ?, ?)';
    db.query(sql, [category, expenseDate, amount], (err) => {
      if (err) {
        console.error('Error adding expense:', err.message);
        return res.status(500).json({ error: 'Failed to add expense.' });
      }
      res.status(201).json({ message: 'Expense added successfully.' });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an expense
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'A valid expense ID is required.' });
  }

  const sql = 'DELETE FROM expenses WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting expense:', err.message);
      return res.status(500).json({ error: 'Failed to delete expense.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found.' });
    }
    res.json({ message: 'Expense deleted successfully.' });
  });
});

// Edit an expense
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { category, date, amount } = req.body;

  // Validate inputs
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'A valid expense ID is required.' });
  }
  if (!category || !amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Category and a valid amount are required.' });
  }

  const expenseDate = date ? formatDate(date) : formatDate(new Date());
  const sql = 'UPDATE expenses SET category = ?, date = ?, amount = ? WHERE id = ?';
  db.query(sql, [category, expenseDate, amount, id], (err, results) => {
    if (err) {
      console.error('Error updating expense:', err.message);
      return res.status(500).json({ error: 'Failed to update expense.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found.' });
    }
    res.json({ message: 'Expense updated successfully.' });
  });
});

module.exports = router;
