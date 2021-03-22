const express = require('express')
const app = express()
const mysql = require("mysql")

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "crud_employee_app"
})

app.post("/create", (req, res) => {
    // continue here
    // learn about express requests
})

app.listen(3001, () => {
    console.log("Your server is running on port 3001")
})

// figure out mysql workbench