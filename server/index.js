require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoute = require('./route/auth');

const port = process.env.PORT
const db = process.env.DATABASE_URL 

app.use(express.json())

mongoose.connect(db)
.then(() => {
    console.log("Successfully connected to database");
})
.catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
});


app.use('/user', authRoute)



app.listen(port, () => {
    console.log(`Server running on port ${port} `)
})