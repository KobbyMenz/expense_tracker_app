import React from "react";
import "../NewExpense/NewExpense.css";
import ExpenseForm from "./ExpenseForm";
// import AddNewExpense from "../NewExpense/AddNewExpense";

function NewExpense(props) {
  //const saveExpenseDataHandler = (enteredExpenseData) => {
  // const expenseData = {
  // 	...enteredExpenseData,
  // 	id: Math.random().toString(),
  // };

  // props.onAddExpenses(expenseData);
  //};

//   const onHideFormHandler = () => {
//     console.log("clicked");
//   };

  // const onHideHandler = () => {
  // 	console.log("clicked");
  // };

  return (
    <div className="new-expense">
      {/* <AddNewExpense onHide={onHideHandler} /> */}

      <ExpenseForm
        // onSaveExpenseData={props.onAddExpenses}
        // onHideForm={onHideFormHandler}
      />
    </div>
  );
}

export default NewExpense;
