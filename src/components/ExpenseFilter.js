import React, { Fragment } from "react";
import "./ExpenseFilter.css";

function ExpenseFilter(props) {
  const dropDownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <Fragment>
      <div className="expense-filter">
        <h3>Filter by year</h3>
        <select
          className="expense-filter__year"
          value={props.selected}
          onChange={dropDownChangeHandler}
        >
          <option value="All List">All List</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
    </Fragment>
  );
}

export default ExpenseFilter;
