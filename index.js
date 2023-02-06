const express = require("express")
const morgan = require("morgan")
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const cors = require('./cors');
const app = express()

app.use(morgan("dev"))
app.listen(app.get("port"))
console.log(`Server on port ${app.get("port")}`)
app.use(cors());












 




// data u:Johns p:qKLUqWfs7PjZwUu2
//mongodb+srv://Johns:qKLUqWfs7PjZwUu2@cluster0.i2smq6y.mongodb.net/?retryWrites=true&w=majority



app.use('/static', express.static(path.join(__dirname, 'static')))


// Configuración de Multer para almacenar las imágenes en una carpeta estática
products = []
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'static/photos/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });




const connection = mysql.createConnection({
  host: 'bzc2vs79rtlg1pmcnuf2-mysql.services.clever-cloud.com',
  user: 'uftekw6lr9o2a7oq',
  password:"uftekw6lr9o2a7oq",
  database: 'bzc2vs79rtlg1pmcnuf2'
});

connection.connect(() => {
  
  console.log('Conectado como ID: ' + connection.threadId);
});

app.post('/products', upload.array('photos', 50), (req, res) => {
  connection.query(
    'INSERT INTO products_data (name, email, details, lat, lon, photos) VALUES (?, ?, ?, ?, ?, ?)',
    [req.body.name, req.body.email, req.body.details, req.body.lat, req.body.lon, saved_images])
  const saved_images = req.files.map(file => 'http://' + req.get("host") + '/static/photos/' + file.filename)
  const product = {
    name: req.body.name,
    email: req.body.email,
    details: req.body.details,
    lat: req.body.lat,
    lon: req.body.lon,
    photos: saved_images
  };
  

  products.push(product);
  res.status(201).json(product);
});

app.get('/products', (req, res) => {
  console.log({ products})
  res.json({ products})
})






