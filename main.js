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
    res.send(JSON.stringify(result));
    console.log("Get All users");
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
    res.send(JSON.stringify(result));
    console.log(`Get user ${req.params.id}`);
  });
});

app.delete('/users/:id', async (req, res) => {
  var sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
    console.log(`Deleted user ${req.params.id}`);

  });
});

app.put('/users/:id', async (req, res) => {

  let user;
  let select = `SELECT * FROM users
  WHERE users.id = ${req.params.id};`;

  con.query(select, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    user = result[0];
    console.log(user);

    if (req.body.pseudo) user.pseudo = req.body.pseudo;
    console.log(req.body);
    if (req.body.email) user.email = req.body.email;
    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;

    let sql = `UPDATE users SET 
      pseudo = ${con.escape(user.pseudo)},
      email = ${con.escape(user.email)},
      firstname = ${con.escape(user.firstname)},
      lastname = ${con.escape(user.lastname)},
      upadatedat = ${con.escape(new Date().toLocaleString())} 
      WHERE id = ${req.params.id}`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
      console.log(`Upadated user ${req.params.id}`);
    });
  });


});

app.listen(3030);