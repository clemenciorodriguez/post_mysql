const {Router} = require("express")
const router = Router();
const mysql2 = require("../promise-mysql")


const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'node_express_example'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado como ID: ' + connection.threadId);
});
 
     




