const router = require('express').Router();
const User = require('../model/user');
const Post = require('../model/post');
const bcrypt = require("bcrypt");

// Get single user
router.get('/:id', async(req, res) => {
    try {
        
        //Check user by id in the database 
        const user = await User.findById(req.params.id);

        // Validate 
        if(!user) {
            return res.status(404).json('User not found!');
        };

          // Return the user
          return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update user
router.put('/:id', async(req, res) => {

    if (req.body.userId === req.params.id) {

        if (req.body.password) {

          const salt = await bcrypt.genSalt(10);
          
          req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {

          const updatedUser = await User.findByIdAndUpdate( req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your account!");
      }
});


// Delete user
router.delete("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {

      try {

        const user = await User.findById(req.params.id);
        try {

          await Post.deleteMany({ username: user.username });

          await User.findByIdAndDelete(req.params.id);
          
          res.status(200).json("User has been deleted successfully");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  });

module.exports = router