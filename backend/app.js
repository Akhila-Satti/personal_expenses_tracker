require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db')

const budgets=require('./routes/budgets')
const expenses=require('./routes/expenses')
const signup=require('./routes/signup');
const login=require('./routes/login');
const dashboard=require('./routes/dashboard');
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/budgets',budgets)
app.use('/api',expenses)
app.use('/api/signup',signup)
app.use('/api/login',login)
app.use('/api/dashboard',dashboard);
const PORT=process.env.PORT


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
 
});
