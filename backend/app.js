require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db')

const budgets=require('./routes/budgets')
const expenses=require('./routes/expenses')
const signup=require('./routes/signup');
const login=require('./routes/login');
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/budgets',budgets)
app.use('/api/expenses/:budgetId',expenses)
app.use('/api/signup',signup)
app.use('/api/login',login)
const PORT=5000


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
 
});
