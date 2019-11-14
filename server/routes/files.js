const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require('../middleware/check-auth');

const fileController = require("../controllers/file");

// Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// route to upload a file
router.post("/saveto3s", checkAuth, upload.single("image"), fileController.saveFile);

router.post("/deletefrom3s", checkAuth, fileController.deleteFile);

module.exports = router;
