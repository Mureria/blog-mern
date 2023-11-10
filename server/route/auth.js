const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

// Register user
router.post('/register', async(req, res) =>{

    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Get user input
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        if(newUser) {
          return res.status(302).json('User already exists! Please login.');
        }

        // Save user in the db
        const user = await newUser.save();

        // Return the new user created
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Login
router.post('/login', async(req, res) =>{
    try {
        // Get user input
        const { username, password } = req.body;
    
        // Validate user input
        if (!(username && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ username });
    
        if (user && (await bcrypt.compare(password, user.password))) {
    
          return res.status(200).json('Successfully logged in');
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      };
})

module.exports = router