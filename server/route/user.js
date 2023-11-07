const router = require('express').Router();
const User = require('../model/user');
const Post = require('../model/post');
const bcrypt = require("bcrypt");

// Get single user
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });