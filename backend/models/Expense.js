const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    budgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      required: true,
    },
    budgetName:{
      type:String,
      required:true,
    },
    expensename: {
      type: String,
      required: true,
      trim: true,
    },

    spentOn: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: [0, "Amount should be positive"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Expense", expenseSchema);
