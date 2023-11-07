require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");

const authRoute = require('./route/auth');
const userRoute = require('./route/user');
const postRoute = require('./route/post');
const categoryRoute = require('./route/categories');

const port = process.env.PORT
const db = process.env.DATABASE_URL 

app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(db)
.then(() => {
    console.log("Successfully connected to database");
})
.catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
});

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });

  app.post("/api/upload", upload.single("file"), (req, res) => {

    res.status(200).json("File has been uploaded");
  });


app.use('/user', authRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/categories', categoryRoute);



app.listen(port, () => {
    console.log(`Server running on port ${port} `)
})