const cors = require("./cors")
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');

const app = express();
app.use(cors())

const connection = mysql.createConnection({
    host: 'bzc2vs79rtlg1pmcnuf2-mysql.services.clever-cloud.com',
    user: 'uftekw6lr9o2a7oq',
    database: 'bzc2vs79rtlg1pmcnuf2',
    password:"kfrdejJwCGdj3j8IcrsO"
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/photos/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".jpg");
  }
});



const upload = multer({ storage: storage });

app.post('/subir-imagen', upload.array('imagen', 50), (req, res) => {

    
    
  connection.connect();
  const images = req.files.map((file, index) => {
  const url = `http://localhost/static/photos/${file.filename}`;
  return { id: index, url };
});
  const sql = `
    INSERT INTO images (url)
    VALUES ('${JSON.stringify(images)}');
  `;
  
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Images URL inserted into database");
    res.send('Images uploaded and URLs saved in database');
  });
  

  res.status(201).json
}) ;

app.get('/obtener-imagenes', (req, res) => {
    connection.query('SELECT * FROM images', function (err, result, fields) {
    if (err) throw err;
    let data = {};
    data.images = [];
    result.forEach(item => {
    let newString = item.url.replace(/[{}"]/g, ''); // Remueve {} y "
    newString = newString.replace(/id:\d,/g, ''); // Remueve "id:num,"
    newString = newString.replace(/url:/g, ''); // Remueve "url:"
    let urls = newString.split(',');
    data.images.push({
    id: item.id,
    url: urls
    });
    });
    res.send(data);
    });
});



app.get('/obtener-todos-los-datos', (req, res) => {
    connection.query(
    'SELECT images.id, users.nombre, users.email, users.detalles, users.latitud, users.longitud, images.url FROM images JOIN users ON images.user_id = users.id',
    function (err, result, fields) {
    if (err) throw err;
    let data = {};
    data.users = [];
    result.forEach(item => {
    let newString = item.url.replace(/[{}"]/g, '');
    newString = newString.replace(/id:\d,/g, '');
    newString = newString.replace(/url:/g, '');
    let urls = newString.split(',');
    data.users.push({
    id: item.id,
    nombre: item.nombre,
    email: item.email,
    detalles: item.detalles,
    latitud: item.latitud,
    longitud: item.longitud,
    url: urls
    });
    });
    res.send(data);
    });
    });
    
    
    
    
    

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


