import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A category must have a name'],
        unique: [true, 'Category name already exists']
    }
},
    {
        timestamps: true,
    }
);

const Category = mongoose.model('Categories', categorySchema);

export default Category