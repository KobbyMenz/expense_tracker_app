import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import ExpenseItem from "./components/ExpenseItem";
import NewExpense from "./components/NewExpense/NewExpense";
import ExpenseFilter from "./components/ExpenseFilter";
import axios from "axios";
import Modal from "./components/UI/Modal";

function App() {
  // expenses.push(props.expenseData);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState();
  const [expenseCount, setExpenseCount] = useState(0);
  const [filterYear, setFilterYear] = useState("All List");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getExpenses`)
      .then((response) => {
        // console.log("Expenses: ", response.data.result);
        setExpenses(response.data.result);
        // console.log("No. of Students: ", response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch(`http://localhost:3001/api/getExpenses`)
    //   .then((response) => response.json())
    //   .then((data) => setExpenses(data.result))
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [expenses]);

  // console.log("No. of expenses: ", expenseCount);

  const filterChangeHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };

  const filterExpenses = expenses.filter((expense) => {
    return new Date(expense.date).getFullYear().toString().includes(filterYear);
  });

  useEffect(() => {
    setExpenseCount(
      filterYear !== "All List" ? filterExpenses.length : expenses.length
    );
  }, [filterExpenses]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete expense item?")) {
      axios
        .delete(`http://localhost:3001/api/delete/${id}`)
        .then((response) => {
          //alert(response.data.message);

          setError({
            title: "Message",
            message: `${response.data.message}`,
          });

          //Remove the deleted record from the state to update the UI.
          setExpenses(expenses.filter((expense) => expense.id !== id));

          /*-----------------------------------------------------------------
          Updating the number of records in the student database table after deleting records from the table*/
          // axios
          //   .get(`http://localhost:3001/api/getStudentTotal`)
          //   .then((response) => {
          //     //console.log(response.data);
          //     setFormData((prevFormData) => ({
          //       ...prevFormData,
          //       studentTotal: response.data.studentTotal,
          //     }));
          //   })
          //   .catch((err) => {
          //     setError({
          //       title: "Error Message",
          //       message: `Error counting student records in the database: ${err}`,
          //     });
          //   });
        })
        .catch((error) => {
          // console.error("Error deleting records: ", error);

          setError({
            title: "Error Message",
            message: `Error deleting records: ${error.message}`,
          });
        });
    }
  };

  const closeModalHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onCloseModal={closeModalHandler}
        />
      )}

      <div className="main">
        <NewExpense
        // onAddExpenses={addExpensesHandler}
        />

        <div className="expenses_container">
          <div className="expense__count__container">
            <p className="expense__count">{expenseCount}</p>
          </div>
          <ExpenseFilter
            selected={filterYear}
            onChangeFilter={filterChangeHandler}
          />

          <div className="expenses">
            {!(+filterExpenses.length > 0) && filterYear !== "All List" ? (
              <div className="no-expenses__message">No expenses found</div>
            ) : (
              filterExpenses.map((expense) => (
                <ExpenseItem
                  onDelete={() => deleteHandler(expense.id)}
                  key={expense.id}
                  title={expense.title}
                  amount={expense.amount}
                  date={new Date(expense.date)}
                />
              ))
            )}

            {filterYear !== "All List" || filterExpenses.length !== 0
              ? ""
              : expenses.map((expense) => (
                  <ExpenseItem
                    onDelete={() => deleteHandler(expense.id)}
                    key={expense.id}
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}
                  />
                ))}
          </div>

          <div className="footer">Developed by Kobby Menz Technologies</div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
