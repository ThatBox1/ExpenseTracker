const express = require('express');
const Router = express.Router();
const ExpenseController = require('../controllers/expense');

//Create expense API
Router.post('/', ExpenseController.CreateExpense);

//Get expense API
Router.get('/', ExpenseController.GetAllExpense);

// //Delete expense
Router.delete('/:id', ExpenseController.DeleteExpense);

module.exports = Router;