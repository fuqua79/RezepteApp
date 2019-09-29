const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Invalid signup credentials!'
        });
      });
  });
};

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "User not registered!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!fetchedUser) {
        return;
      }
      if (!result) {
        return res.status(401).json({
          message: "Password is wrong!"
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        process.env.JWT_KEY,
        {expiresIn: "1h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Invalid login credentials!"
      });
    });
};

exports.getUser = (req, res, next) => {
  console.log("User holen mit Id= " + req.params.id);
  User.findById(req.params.id)
    .then(usr => {
      console.log("usr: " + usr);
      res.status(200).json(usr.email);
    })
    .catch((err) => {
      console.log('Error occured: ', err);
    });
};
