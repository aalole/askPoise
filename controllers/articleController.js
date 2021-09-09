import Article from "../models/articleModel.js";

const createPost = async (req, res) => {
    try {
        const { title, category, visualType, author, article, tags } = req.body
        const newArticle = await Article.create({
            title,
            category,
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
                    category: newArticle.category,
                    tags: newArticle.tags,
                    article: newArticle.article,
                    author:newArticle.author
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            data: {
                message: error
            }
        })
    }
}

export { createPost }