import Article from "../models/articleModel.js";

const createPost = async (req, res) => {
    try {
        const { title, categories, visualType, article, tags } = req.body
        const newArticle = await Article.create({
            title,
            categories,
            visualType,
            author: req.user._id,
            tags,
            article
        })
        if (newArticle) {
            res.status(201).json({
                data: {
                    message: 'Post created successfully',
                    _id: newArticle._id,
                    title: newArticle.title,
                    visualType: newArticle.visualType,
                    categories: newArticle.categories,
                    tags: newArticle.tags,
                    article: newArticle.article,
                    author: newArticle.author
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// get all post 
const getPosts = async (req, res) => {
    try {
        const posts = await Article.find({})
        if (posts) {
            res.status(200).json({
                total: posts.length,
                data: posts
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const getSinglePost = async (req, res) => {
    try {
        const post = await Article.findById(req.params.id)
        if (post) {
            res.status(200).json({
                data: post
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const postIsExisting = await Article.findById(req.params.id)
        if (!postIsExisting) {
            res.status(404)
            throw new Error('data not found')
        }
        const updatedPost = await Article.findByIdAndUpdate(postIsExisting._id, req.body)
        res.status(200).json({
            data: {
                message: "Post updated Successfully",
                updatedPost
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Post deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export { createPost, getPosts, getSinglePost, updatePost, deletePost }