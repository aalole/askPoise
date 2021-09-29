import Article from "../models/articleModel.js";

const createPost = async (req, res) => {
    try {
        const { title, categories, visualType, article, tags, rating, numReviews } = req.body
        const newArticle = await Article.create({
            title,
            categories,
            visualType,
            author: req.user._id,
            tags,
            article,
            rating,
            numReviews
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
                    author: newArticle.author,
                    rating: newArticle.rating,
                    numReviews: newArticle.numReviews
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
        const keyword = req.query.keyword ? {
            tags: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {}

        const pageDataSize = 10
        const page = Number(req.query.pageNumber) || 1

        const count = await Article.countDocuments({ ...keyword })
        const posts = await Article.find({ ...keyword }).limit(pageDataSize).skip(
            pageDataSize * (page - 1)
        )
        if (posts) {
            res.status(200).json({
                data: {
                    total: posts.length,
                    posts,
                    page,
                    pages: Math.ceil(count / pageDataSize)
                }
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

// createArticleReview

const createArticleReview = async (req, res) => {
    try {
        const { rating, comment } = req.body
        const article = await Article.findById(req.params.id);
        if (article) {
            const userId = req.user._id
            const hasBeenReviewed = article.reviews.find(r => {
                return r.user.toString() === userId.toString()
            })
            if (hasBeenReviewed) {
                res.status(400)
                throw new Error('You have already reviewed this article')
            }
            const review = {
                username: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            article.reviews.push(review)
            article.numReviews = article.reviews.length
            article.rating = article.reviews.reduce((acc, cItem) => cItem.rating + acc, 0) / article.reviews.length
            await article.save()
            res.status(201).json({
                message: "Review successfully added"
            })
        } else {
            res.status(404);
            throw new Error("Post not found");
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getTopArticles = async (req, res) => {
    const articles = await Article.find({}).sort({ rating: -1 }).limit(5);
    res.status(200).json(articles)
}

// list of todos [1. get all tags from all articles as an array]
// store them in a single array and then check query parameters against each of the tag in all tags array.
export { createPost, getPosts, getSinglePost, updatePost, deletePost, createArticleReview, getTopArticles }