const express = require("express");
const cors = require("cors");
const budgets=require('./routes/budgets')
const expenses=require('./routes/expenses')
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/budgets',budgets)
app.use('/api/expenses',expenses)

app.listen(5000, () => {
  console.log("listening on port 5000");
});
