import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user!'],
      },
  },
  {
    timestamps: true,
  }
);

export default reviewSchema;