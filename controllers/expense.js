const ExpenseModel = require('../models/expense');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')

const GetAllExpense = async (req, res)  => {

    try {
        const expenses = await ExpenseModel.find();
        return res.status(200).json({
            message: 'Successfully found the expense!',
            data: expenses
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the expenses!',
            error
        })
    }
}

const CreateExpense = async (req, res) => {
    const allHeaders = req.headers;

    if (!allHeaders.authorization) {
        return res.status(401).json({
            message: "Please provide the token"
        })
    }

    const token = allHeaders.authorization;

    const decodedToken = jwt.decode(token, { complete: true});

    const userId = decodedToken.payload.id;

    const userExists = await UserModel.findById(userId);
    if(!userExists){
        return res.status(401).json({
            message: 'Your are not authorized to add an expense'
        })
    }

    const expenseBody = req.body;

    const newExpense = new ExpenseModel({
        user: userId,
        itemName: expenseBody.itemName,
        amount: expenseBody.amount,
        description: expenseBody.description,
        date: expenseBody.date
    })

    const savedExpense = await newExpense.save();

    return res.status(201).json({
        message: "Expense Logged Succesfully!",
        data: savedExpense
    })
}

const DeleteExpense = async (req, res) => {
    const expenseId = req.params.id;

    try {
        const expense = await ExpenseModel.findById(expenseId);
        if (!expense) {
            return res.status(404).json({
                message: "Expense not found!"
            });
        }

        // Delete the expense
        await ExpenseModel.findByIdAndDelete(expenseId);

        return res.status(200).json({
            message: "Expense deleted successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting expense!',
            error
        });
    }
};




module.exports = {
    GetAllExpense,
    CreateExpense,
    DeleteExpense
}