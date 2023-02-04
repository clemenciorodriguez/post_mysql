const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('./cors');
 

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// data u:Johns p:qKLUqWfs7PjZwUu2
//mongodb+srv://Johns:qKLUqWfs7PjZwUu2@cluster0.i2smq6y.mongodb.net/?retryWrites=true&w=majority
app.use("/api", require("./routes/tracks"))


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

app.post('/products', upload.array('photos', 50), (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}` );
});
