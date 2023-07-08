import React, { useState, useEffect, useCallback } from 'react';
import classes from './SignUpPage.module.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { themeActions } from '../Auth/authReducer';
import { useSelector, useDispatch } from 'react-redux';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyClIPPOHZO2rXXR0jqDK2r6W4eXHCqU5SQ",

  databaseURL: "https://expense-auth-38581-default-rtdb.firebaseio.com/",
  projectId: "expense-auth-38581",

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

const Exp = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState(null);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);


  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://expense-auth-38581-default-rtdb.firebaseio.com/expenses.json');
      if (!response.ok) {
        throw new Error('Something went wrong... Please try again.');
      }
      const data = await response.json();

      const loadedExpenses = [];

      for (const key in data) {
        loadedExpenses.push({
          id: key,
          moneySpent: data[key].moneySpent,
          description: data[key].description,
          category: data[key].category,
        });
      }
      setExpenseList(loadedExpenses);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpenseHandler = async (event) => {
    event.preventDefault();
    const moneySpent = event.target.elements.moneySpent.value;
    const description = event.target.elements.description.value;
    const category = event.target.elements.category.value;

    const newExpense = {
      moneySpent,
      description,
      category,
    };

    try {
      // Store expense data in the Firebase database
      await database.ref('expenses').push(newExpense);
      setExpenseList((prevExpenseList) => [...prevExpenseList, newExpense]);
      event.target.reset();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };
  const deleteExpenseHandler = async (expenseId) => {
    try {
      const response = await fetch(`https://expense-auth-38581-default-rtdb.firebaseio.com/expenses/${expenseId}.json`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense. Please try again.');
      }

      console.log('Expense successfully deleted');
      // Refresh the expense list after deleting an expense
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };
  const startEditingHandler = (expense) => {
    setIsEditing(true);
    setEditedExpense(expense);
  };
  const submitEditingHandler = async (event) => {
    event.preventDefault();

    const moneySpent = event.target.elements.moneySpent.value;
    const description = event.target.elements.description.value;
    const category = event.target.elements.category.value;

    const editedExpenseData = {
      moneySpent,
      description,
      category,
    };

    try {
      const response = await fetch(`https://expense-auth-38581-default-rtdb.firebaseio.com/expenses/${editedExpense.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(editedExpenseData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update expense. Please try again.');
      }

      console.log('Expense successfully updated');
      setIsEditing(false);
      setEditedExpense(null);
      // Refresh the expense list after updating an expense
      fetchExpenses();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };
  const totalExpenses = expenseList.reduce(
    (total, expense) => total + Number(expense.moneySpent),
    0
  );
  const toggleThemeHandler = () => {
    if (theme === 'light') {
      dispatch(themeActions.toggleTheme('dark'));
    } else {
      dispatch(themeActions.toggleTheme('light'));
    } }

    const downloadExpensesHandler = () => {
      const csvContent = [
        'Money Spent,Description,Category',
        ...expenseList.map((expense) => `${expense.moneySpent},${expense.description},${expense.category}`),
      ].join('\n');
  
      const element = document.createElement('a');
      const file = new Blob([csvContent], { type: 'text/csv' });
      element.href = URL.createObjectURL(file);
      element.download = 'expenses.csv';
      document.body.appendChild(element); // Required for Firefox
      element.click();
      document.body.removeChild(element); // Clean up
    };
const activatePremiumHandler = () => {
    dispatch(themeActions.toggleTheme('dark')); // Dispatch the toggleTheme action with 'dark' theme
  };
  return (
    <section>
      <div>
        <h2>Add Expense</h2>
        <form onSubmit={addExpenseHandler}>
          <div>
            <label htmlFor='moneySpent'>MoneySpent:</label>
            <input type='text' id='moneySpent' required />
          </div>
          <div>
            <label htmlFor='description'>Description:</label>
            <input type='text' id='description' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='category'>Category</label>
            <select id='category' required>
              <option value=''>Select a category</option>
              <option value='Food'>Food</option>
              <option value='Petrol'>Petrol</option>
              <option value='Salary'>Salary</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className={classes.actions}>
            <button type='submit'>Add Expense</button>
          </div>
        </form>
        
      </div>
      {isLoading ? (
        <p>Loading expenses...</p>
      ) : (
        expenseList.length > 0 && (
          <div>
            <h2>Expenses</h2>
            <ul>
              {expenseList.map((expense) => (
                <li key={expense.id}>
                  <strong>Money Spent:</strong> {expense.moneySpent}
                  <br />
                  <strong>Description:</strong> {expense.description}
                  <br />
                  <strong>Category:</strong> {expense.category}
                  <br/>
                  {!isEditing && (
                  <div>
                    <button onClick={() => deleteExpenseHandler(expense.id)}>Delete</button>
                    <button onClick={() => startEditingHandler(expense)}>Edit</button>
                  </div>
                )}
                {isEditing && editedExpense && editedExpense.id === expense.id && (
  <form onSubmit={submitEditingHandler}>
    <label htmlFor="moneySpent">Money Spent:</label>
    <input type="text" id="moneySpent" defaultValue={editedExpense.moneySpent} />
    <br />

    <label htmlFor="description">Description:</label>
    <input type="text" id="description" defaultValue={editedExpense.description} />
    <br />

    <label htmlFor="category">Category:</label>
    <input type="text" id="category" defaultValue={editedExpense.category} />
    <br />

    <button type="submit">Submit</button>
  </form>
)}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
      {error && <p>Error: {error}</p>}
      {totalExpenses > 10000 && <button className={classes.activatePremiumButton} onClick={activatePremiumHandler}>Activate Premium</button>}
      <button className={classes.themeToggle} onClick={toggleThemeHandler}>
        Toggle Theme
      </button> 
      <button className={classes.downloadButton} onClick={downloadExpensesHandler}>
        Download File
      </button>
    </section>
  );
};

export default Exp;
