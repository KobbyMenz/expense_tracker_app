const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

/*
======================================
Setting up cross-origin requests (COR)
======================================
*/
app.use(
  cors({
    origin: "http://localhost:3000", //Allowing request from React(cross-origin requests)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //if using cookies or auth headers
  })
);

//Middleware
app.use(express.json());
//app.use(cors()); //Allow all
app.use(bodyParser.json());

/*

=================================
MYSQL DATABASE CONNECTION
==================================
*/
//MySQL connection
require("dotenv").config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//Connection to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error: ", err);
    throw err;
  } else {
    console.log("Connected to MySQL");
  }
});

/*

==================================================
API to route and insert expense data into the database
             (starts)
        ADD EXPENSE TO DATABASE
=============================================*/
app.post("/api/add", (req, res) => {
  // console.log("Request received: ", req.body);
  const { title, amount, date } = req.body;

  const sqlInsert =
    "INSERT INTO expense_db.expense (title, amount, date) VALUES (?,?,? )";
  db.query(sqlInsert, [title, amount, date], (err, result) => {
    if (err) {
      console.log("Database error", err);
      return res.status(500).json({ error: "Database error: " }); //returning HTTP status
    }

    res.status(201).json({ message: "added successfully" });
  });
});

/*

==================================================
API route to query database all expenses data
      (QUERY TO GET ALL EXPENSES)
 ======================================================*/
app.get("/api/getExpenses", (req, res) => {
  const sqlQuery = `SELECT * FROM expense_db.expense ORDER BY id DESC`;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("Error fetching data", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json({
      result: result,
    }); //Sending the query result back to json.
  });
});

/*

===============================================
API to route to delete EXPENSE ITEM using expense id (Starts)
        (DELETE EXPENSE ITEM)
===============================================*/
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  const sqlDelete = "DELETE FROM expense_db.expense WHERE id = ? ";
  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.log("Database error", err);
      return res.status(500).send("Error deleting expense: ", err); //returning HTTP status
    }

    res.status(201).json({ message: "expense deleted successfully" });
  });
});

/*

===========================================
STARTING SERVER ON PORT 3001
==========================================
*/
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
