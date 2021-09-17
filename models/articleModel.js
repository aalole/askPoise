import mongoose from 'mongoose'
import reviewSchema from './reviewModel.js';

const articleSchema = new mongoose.Schema({
    visualType: {
        type: String,
        required: true,
        unique: true,
        default: 'post_image.jpg'
    },
    title: {
        type: String,
        required: true,
        minlength: [5, 'At least five characters required']
    },
    categories: {
        type: [String],
        required: true,
        default: 'effective communication',
        lowercase: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A post must belong to an admin user']
    },
    tags: {
        type: [String],
        required: true,
        default: ['negotiation', 'bargain']
    },
    article: {
        type: String,
        required: true,
        maxlength: [2000, 'This article cannot be longer than 2000 words only']
    },
    rating: {
        type: Number,
        require: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        require: true,
        default: 0,
    },
    reviews: [reviewSchema]
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

export default Article