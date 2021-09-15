import dotenv from 'dotenv'

dotenv.config()

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_secret: process.env.CLOUDINARY_API_SECRET,
});
export function uploads(file) {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
}

// import dotenv from 'dotenv'
// import cloudinary from 'cloudinary'

// const cv2 = cloudinary.v2

// dotenv.config()

// cv2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   cloud_secret: process.env.CLOUDINARY_API_SECRET,
// })

// const uploads = (file, folder) => {

//   return new Promise((resolve) => {
//     cv2.uploader.upload(
//       file,
//       (result) => {
//         resolve({ url: result.url, id: result.public_id });
//       },
//       {
//         resource_type: "auto",
//         folder
//       }
//     );
//   });
// };

// export default uploads

