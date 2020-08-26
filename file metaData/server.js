'use strict';

const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const upload = multer();
const app = express();

app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index'));

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname, mimetype, size } = req.file;
  return res.json({ name: originalname, type: mimetype, size: size })                     
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
