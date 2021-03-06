const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();


router.post("/signup", UserController.createUser);

router.post("/login", UserController.login);

router.get('/:id', UserController.getUser);


module.exports = router;
