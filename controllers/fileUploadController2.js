import Image from "../models/imageModel.js";
//IMPORT CLOUDINARY CONFIG
import uploads from "../utils/config/cloudinaryConfig.js";

export function createImage(req, res) {
    // console.log(req.files)
    let imageDetails = {
        imageName: req.files.imageName,
    };
    //USING MONGODB QUERY METHOD TO FIND IF IMAGE-NAME EXIST IN THE DB
    Image.find({ imageName: imageDetails.imageName }, (err, callback) => {
        //CHECKING IF ERROR OCCURRED.
        if (err) {
            res.json({
                err: err,
                message: `There was a problem creating the image because: ${err.message}`,
            });
        } else {
            let attempt = {
                imageName: req.files[0].originalname,
                imageUrl: req.files[0].path,
                imageId: "",
            };
            uploads(attempt.imageUrl).then((result) => {
                let imageDetails = {
                    imageName: req.files[0].originalname,
                    imageUrl: result.url,
                    imageId: result.id,
                    clientId: req.body.clientId,
                    clientUsername: req.body.clientUsername,
                };
                // Create image in the database
                Image.create(imageDetails)
                    .then((image) => {
                        res.json({
                            success: true,
                            data: image,
                        });
                    })
                    .catch((error) => {
                        res.json({
                            success: false,
                            message: `Error creating image in the database: ${error.message}`,
                        });
                    });
            });
        }
    });
}