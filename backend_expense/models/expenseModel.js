const db = require('../config/db');

// Create expenses table if not exists
const createExpensesTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS expenses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(50),
      amount DECIMAL(10, 2),
      date DATE,
      notes TEXT
    )
  `;
  db.query(query, (err) => {
    if (err) console.error('Error creating expenses table:', err.message);
  });
};

createExpensesTable();

module.exports = db;
