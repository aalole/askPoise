import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const imageSchema = new Schema({
  imageName: {
    type: String,
    required: true
    },
  imageId: {
    type: String,
    },
  imageUrl: {
    type: String,
  }
});

const Image = model('Image', imageSchema)

export default Image