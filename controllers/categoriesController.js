import Category from "../models/categoryModel.js";

const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const categoryExists = await Category.findOne({ name })
        if (categoryExists) {
            res.status(400)
            throw new Error('category already exists')
        }
        const newCategory = await Category.create({ name })
        if (newCategory) {
            res.status(201).json({
                data: {
                    message: 'New category added successfully',
                    newCategory
                }
            })
        }

    } catch (error) {
        console.log('Error:', error)
    }
}


const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json({
            data: {
                total: categories.length,
                categories
            }
        })
    } catch (error) {

    }
}
export { createCategory, getAllCategories }