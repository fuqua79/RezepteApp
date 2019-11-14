var AWS = require("aws-sdk");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

exports.deleteFile = function (req, res) {
  const fileName = req.body.imageName;

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  });
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName
  };

  s3bucket.deleteObject(params, function (err, data) {
    if (err) {
      console.log('err:', err);
      res.status(500).json({
        message: err
      });
    } else {
      res.status(200).json({});
    }
  });

};


exports.saveFile = function (req, res) {
  const file = req.file;

  // Logik, dass nur Images gespeichert werden sollen !
  const fileExtension = MIME_TYPE_MAP[file.mimetype];
  if (!fileExtension) {
    res.status(500).json({
      message: "File is no image ¨!"
    });
  }

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  });

  //Where you want to store your file
  const fileName = file.originalname.replace(/\s/g, '') + "-" + Date.now() + "." + fileExtension;
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  s3bucket.upload(params, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err
      });
    } else {
      res.status(201).json({
        'imagePath': data.Location
      });
    }
  });
};
