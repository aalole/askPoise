import multer, { diskStorage } from "multer";
import { join, resolve } from "path";
//multer.diskStorage() creates a storage space for storing files.
const imageStorage = diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      const __dirname = resolve()
      cb(null, join(__dirname, "../files"));
    } else {
      cb({ message: "This file is not an image file" }, false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const imageUpload = multer({ storage: imageStorage });











// import multer from 'multer'
// import path from 'path'
// import uploads from './cloudinaryConfig'

// const imageStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
//             cb(null, path.join(__dirname, "../../files"));
//         } else {
//             cb({ message: "This file is not an image file" }, false);
//         }
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// // const storage = multer.diskStorage({
// //     destination(req, file, cb) {
// //         cb(null, '../../files/')
// //     },
// //     filename(req, file, cb) {
// //         // note, normallt, we could have the file unformatted(using filename directly)
// //         // however, to avoid naming conflicts.... let's do some formatting

// //         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
// //     }
// // })

// // function checkFileType(file, cb) {
// //     const types = /jpg|png|jpeg/
// //     const extensionName = types.test(path.extname(file.originalname).toLocaleLowerCase())
// //     const mimetype = types.test(file.mimetype)
// //     if (extensionName && mimetype) {
// //         return cb(null, true)
// //     } else {
// //         cb('Unsupported file format', false)
// //     }
// // }
// const upload = multer({
//     //note: using storage alone will allow uploading of differnet filetypes which isnt suitable atm
//     storage,
//     limits: { fileSize: 1000 * 1000 },
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb)
//     }
// })

// export default upload


