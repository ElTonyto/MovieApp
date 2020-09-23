var mysql = require('mysql');
const express = require('express');
const app = express();


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "azerty",
  database: "movieApp"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/users', async (req, res) => {
  //Select all customers and return the result object:
  response = con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });

});

app.post('/users', async (req, res) => {
  let sql = `INSERT INTO users VALUES 
  (NULL,
    ${con.escape(req.body.pseudo)},
    ${con.escape(req.body.email)},
    ${con.escape(req.body.firstname)},
    ${con.escape(req.body.lastname)},
    ${con.escape(new Date().toLocaleString())},
    NULL)`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
    console.log("1 record inserted");
  });

});

app.get('/users/:id', async (req, res) => {
  let sql = `SELECT * FROM users
  WHERE users.id = ${req.params.id};`;

  response = con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

/*
app.get('/users?limit=20&offset=0', async (req, res) => {

});
*/

app.delete('/users/:id', async (req, res) => {
  var sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

app.put('/users/:id', async (req, res) => {



  let sql = `UPDATE users SET VALUES 
    (NULL,
      ${con.escape(req.body.pseudo)},
      ${con.escape(req.body.email)},
      ${con.escape(req.body.firstname)},
      ${con.escape(req.body.lastname)},
      ${con.escape(new Date().toLocaleString())},
      ${con.escape(new Date().toLocaleString())}, 
      WHERE users.id = ${req.params.id})`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
    console.log("1 record inserted");
  });

});


app.listen(3030);