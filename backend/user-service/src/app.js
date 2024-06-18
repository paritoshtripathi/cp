const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

app.listen(8000, () => {
  console.log('User service listening on port 8000');
});
