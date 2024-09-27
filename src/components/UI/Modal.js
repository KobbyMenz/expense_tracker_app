import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "../UI/Modal.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onCloseModal} />;
};

const ModalOverlay = (props) => {
	return (
		<Card className={classes.modal}>
			<header>{props.title}</header>
			<div className={classes.content}>
				<p>{props.message}</p>
			</div>
			<footer className={classes.btn}>
				<Button onClick={props.onCloseModal}>Okay</Button>
			</footer>
		</Card>
	);
};

const Modal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onCloseModal={props.onCloseModal} />,
				document.getElementById("backdrop-root")
			)}
			{ReactDOM.createPortal(
				<ModalOverlay
					title={props.title}
					message={props.message}
					onCloseModal={props.onCloseModal}
				/>,
				document.getElementById("overlay-root")
			)}
		</Fragment>
	);
};

export default Modal;
