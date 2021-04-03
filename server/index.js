const express = require('express')
const app = express()
const mysql = require("mysql")
const cors = require("cors")

// had to install cors library thingy
// the thing won't post properly, might be because a route has not been set properly here
// change /create to /
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "crud_employee_app"
})

// continue tutorial
app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
        [name, age, country, position, wage],
        (err, result) => {
            if(err){
                console.log(err);
            } else {
                // put req instead of res.send()
                res.send("Values Inserted");
            }
        }
    )
})

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
    // test this motherfucker out later
})

app.listen(3001, () => {
    console.log("Your server is running on port 3001")
})

// work on this now