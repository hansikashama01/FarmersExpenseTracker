const db = require('../models/expenseModel');

// Get all expenses
const getAllExpenses = (req, res) => {
  db.query('SELECT * FROM expenses', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
};

// Add a new expense
const addExpense = (req, res) => {
  const { type, amount, date, notes } = req.body;
  const query = 'INSERT INTO expenses (type, amount, date, notes) VALUES (?, ?, ?, ?)';
  db.query(query, [type, amount, date, notes], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: result.insertId });
  });
};

// Update an expense
const updateExpense = (req, res) => {
  const { id } = req.params;
  const { type, amount, date, notes } = req.body;
  const query = 'UPDATE expenses SET type = ?, amount = ?, date = ?, notes = ? WHERE id = ?';
  db.query(query, [type, amount, date, notes, id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.send('Expense updated successfully');
  });
};

// Delete an expense
const deleteExpense = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM expenses WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.send('Expense deleted successfully');
  });
};



module.exports = { getAllExpenses, addExpense, updateExpense, deleteExpense };
