const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transaction = require('./models/transaction'); //importing model

const app = express();
app.use(express.json())
app.use(cors());

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Data base connected"))
    .catch(err => console.error("error connecting database"));

//routes
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transaction', transactionRoutes);