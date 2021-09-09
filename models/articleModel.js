import mongoose from 'mongoose'

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
    category: {
        type: String,
        required: true,
        enum: ['effective communication', 'Team Work', 'Branding', 'Creativity', 'Emotional Intelligence', 'Diplomacy'],
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
    }
});

const Article = mongoose.model('Article', articleSchema);

export default Article