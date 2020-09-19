const app = require("express");
const router = app.Router();
const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path');

const s3 = new aws.S3({
    accessKeyId: process.env.accesskey,
    secretAccessKey: process.env.secretaccess,
    bucket: 'myautospacebbk'
})

aws.config.update({
    accessKeyId: process.env.accesskey,
    secretAccessKey: process.env.secretaccess,
})

//Image download
router.get("/api/photo/:filename", (req, res) => {
    getImage(req.params.filename)
        .then((img) => {
            let image = "data:image/jpeg;base64," + encode(img.Body);
            let startHTML = "<html><body></body>";
            let endHTML = "</body></html>";
            let html = startHTML + image + endHTML;
            res.send(image)
        }).catch((e) => {
            res.send(e)
        });
})



let apiCall = new aws.S3();

async function getImage(req) {
    let photoParams = {
        Bucket: "myautospacebbk",
        Key: req
    };
    const data = apiCall.getObject(photoParams).promise();
    return data
};

function encode(data) {
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return base64
};

//Image Upload
const imgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'myautospacebbk',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profileImage');/**
    * Check File Type
    * @param file
    * @param cb
    * @return {*}
    */
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype); if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}/**
    * @route POST api/profile/business-img-upload
    * @desc Upload post image
    * @access public
    */

router.post('/api/photoUpload/', (req, res) => {
    imgUpload(req, res, (error) => {
        console.log('requestOkokok', req.file);
        console.log('error', error);
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                console.log('Error: No File Selected!');
                res.json('Error: No File Selected');
            } else {
                // If Success
                console.log("success in photo!")
                const imageName = req.file.key;
                const imageLocation = req.file.location;// Save the file name into database into profile model
                res.json({
                    image: imageName,
                    location: imageLocation
                });
            }
        }
    });
});// End of single profile upload/**

module.exports = router;