import React, { useState, Fragment } from "react";
import "../NewExpense/ExpenseForm.css";
import Modal from "../UI/Modal";
import axios from "axios";

function ExpenseForm(props) {
  const [formData, setFormData] = useState({ title: "", amount: "", date: "" });

  const [error, setError] = useState();

  const formDataChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((preFormData) => {
      return {
        ...preFormData,
        [name]: value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      formData.title.trim().length === 0 ||
      formData.amount.trim().length === 0 ||
      formData.date.length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid title and amount.",
      });
      return;
    }

    const expenseData = {
      title: formData.title,
      amount: formData.amount,
      date: formData.date,
      // id: Math.random().toString(),
    };

    axios
      .post("http://localhost:3001/api/add", expenseData)
      .then((reponse) => {
        //console.log(reponse.data);
        // alert("Registered successfully");

        setError({
          title: "Message",
          message: "Expense added successfully",
        });

        //Clearing input fields
        setFormData({
          title: "",
          amount: "",
          date: "",
        });
      })
      .catch((err) => {
        // console.error("Error inserting data: ", err);
        // console.log(err);

        setError({
          title: "Error Message",
          message: `Error adding expense: ${err}`,
        });
        return;
      });

    // props.onSaveExpenseData(expenseData);

    //Clearing input filds

    // setEnteredTitle("");
    // setEnteredAmount("");
    // setEnteredDate("");
  };

  const closeModalHandler = () => {
    setError(null);
  };

  // props.addNewEpenseHandler = (e) => {
  // 	props.onHideForm(setIsHidden(true));
  // };
  return (
    <Fragment>
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onCloseModal={closeModalHandler}
        />
      )}

      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={formDataChangeHandler}
              placeholder=""
              name="title"
            />
          </div>

          <div className="new-expense__control">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              value={formData.amount}
              min="0.01"
              step="0.01"
              onChange={formDataChangeHandler}
              placeholder=""
              name="amount"
            />
          </div>

          <div className="new-expense__control">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={formData.date}
              min="2019-01-01"
              step="2022-12-20"
              onChange={formDataChangeHandler}
              placeholder=""
              name="date"
            />
          </div>
        </div>
        <div className="new-expense__actions">
          {/* <button className="cancel_btn" type="cancel">
						Cancel
					</button> */}

          <button type="submit">Add Expense</button>
        </div>
      </form>
    </Fragment>
  );
}

export default ExpenseForm;
