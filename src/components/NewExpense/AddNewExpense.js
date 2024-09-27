// import React, { useState } from "react";
// import "./ExpenseForm.css";

// function AddNewExpense(props) {
// 	const [isHidden, setIsHidden] = useState(false);

// 	const addNewEpenseHandler = (e) => {
// 		e.preventDefault();
// 		const target = e.target.textContent;
// 		if (target === "Add New Expense") {
// 			props.onHide(setIsHidden(true));
// 			// props.onHideForm(setIsHidden(false));
// 		}
// 	};
// 	//
// 	return (
// 		<form>
// 			<div style={{ display: isHidden ? "none" : "" }}>
// 				<button onClick={addNewEpenseHandler}>Add New Expense</button>
// 			</div>
// 		</form>
// 	);
// }

// export default AddNewExpense;
