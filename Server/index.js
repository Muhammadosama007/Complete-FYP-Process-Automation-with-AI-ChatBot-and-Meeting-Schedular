const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

//mongoose.connect(process.env.dbConection);

app.listen(process.env.Port, () => {
    console.log("server listening on port: ", process.env.Port);
})