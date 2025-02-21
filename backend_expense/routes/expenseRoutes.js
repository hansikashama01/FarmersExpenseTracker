const express = require('express');
const router = express.Router();
const {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');

router.get('/expenses', getAllExpenses);
router.post('/expenses', addExpense);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

module.exports = router;
