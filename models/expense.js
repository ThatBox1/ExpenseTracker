const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
}, {
    timestamps: true
});

const ExpenseModel = mongoose.model('Expense', ExpenseSchema);

module.exports = ExpenseModel;