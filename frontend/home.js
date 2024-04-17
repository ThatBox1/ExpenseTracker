let expenseList = [];

function checkIfUserLoggedIn(){
    const token = localStorage.getItem('token');
    if (!token){
        window.location.href = 'http://localhost:4000';
    }
}

async function createExpense(event){
    event.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    

    const expenseData = {
        itemName,
        amount,
        description,
        date
    }

    const token = localStorage.getItem('token');

    if(!token){
        alert("TOKEN NOT FOUND!");
        return;
    }

    try {
        const createdExpense = await fetch('/api/v1/user/expense', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(expenseData)
        });

        const createdExpenseJSON = await createdExpense.json();

        if (createdExpenseJSON){
            alert(createdExpenseJSON.message);
            location.reload(true);
        }
    } catch (error){
        alert('There was an error!')
    }
}

async function getAllExpense(){
    try {
        const allExpense = await fetch('/api/v1/user/expense');

        const allExpenseJson = await allExpense.json();
        expenseList = allExpenseJson.data;
        
        generateAllExpenses(expenseList);
    } catch (error){
        alert('There was an error!');
    }
}


async function generateAllExpenses(expenseList) {
    const expenseElements = document.getElementById('ExpenseItem')

    expenseElements.innerHTML = "";

    for (let expense of expenseList) {
        const expenseItem =
            `<div class="max-w-sm bg-white shadow-md rounded-lg overflow-hidden mb-4">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl text-gray-800 mb-2">${expense.itemName}</div>
                    <p class="text-gray-700 text-base">${expense.description}</p>
                    <div class="flex justify-between items-center mt-4">
                        <p class="text-gray-600 text-sm">${new Date(expense.date).toLocaleDateString()}</p>
                        <p class="text-indigo-600 font-semibold">Amount: ${expense.amount}</p>
                    </div>
                </div>
                <div class="px-6 py-2 bg-gray-100">
                    <button type="button" class="delete-button bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100" data-expense-id=${expense._id}>Delete Expense</button>
                </div>
            </div>`;

        expenseElements.innerHTML += expenseItem;
    }
    attachDeleteEventListeners();
}

async function deleteExpense(expenseId) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/api/v1/user/expense/${expenseId}`, {
            method: "DELETE",
            headers: {
                "Authorization": token
            }
        });

        if (response.ok) {
            expenseList = expenseList.filter(expense => expense._id !== expenseId);
            generateAllExpenses(expenseList);
            alert("Expense deleted successfully!");
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.error("Error deleting expense:", error);
        alert("Error deleting expense. Please try again.");
    }
}


function attachDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const expenseId = button.dataset.expenseId;
            await deleteExpense(expenseId);
        });
    });
}


function logout(event){
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:4000';
}

checkIfUserLoggedIn();
getAllExpense();
