import React from "react";
import { useState } from "react";
import classes from './SignUpPage.module.css';
const Exp=()=>{
    const [expenseList, setExpenseList] = useState([]);const addExpenseHandler = (event) => {
        event.preventDefault();
        const moneySpent = event.target.elements.moneySpent.value;
        const description = event.target.elements.description.value;
        const category = event.target.elements.category.value;
    
        const newExpense = {
          moneySpent,
          description,
          category,
        };
    
        setExpenseList((prevExpenseList) => [...prevExpenseList, newExpense]);
    
        // Clear form input fields after adding an expense
        event.target.reset();
      };

    return (
        <section>
        <div>
           <h2>Add Expense</h2>
           <form onSubmit={addExpenseHandler}>
             <div className={classes.control}>
               <label htmlFor='moneySpent'>Money Spent:</label>
               <input type='text' id='moneySpent' required />
             </div>
             <div className={classes.control}>
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
         {expenseList.length > 0 && (
         <div>
           <h2>Expenses</h2>
           <ul>
             {expenseList.map((expense, index) => (
               <li key={index}>
                 <strong>Money Spent:</strong> {expense.moneySpent}
                 <br />
                 <strong>Description:</strong> {expense.description}
                 <br />
                 <strong>Category:</strong> {expense.category}
               </li>
             ))}
           </ul>
         </div>
       )}
       </section>
    );

}
export default Exp;