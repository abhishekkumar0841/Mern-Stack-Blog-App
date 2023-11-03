import express from 'express'
import { allBlogs, createBlog, deleteBlog, getBlogById, updateBlog, userBlog } from '../controllers/blog.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import { createComment } from '../controllers/comment.controller.js'
import { disLike, like } from '../controllers/like.controller.js'

const blogRoutes = express.Router()

blogRoutes.post('/post', authMiddleware, createBlog)
blogRoutes.get('/', allBlogs)
blogRoutes.get('/:id', getBlogById)
blogRoutes.get('/user', authMiddleware, userBlog)
blogRoutes.put('/:id',authMiddleware, updateBlog)
blogRoutes.delete('/:id',authMiddleware, deleteBlog)

// *****COMMENT ROUTES*******
blogRoutes.post('/comment/:id', authMiddleware, createComment)

//*******LIKE ROUTES******** */
blogRoutes.post('/like/:id', authMiddleware, like)
blogRoutes.delete('/dislike/:id', authMiddleware, disLike)

export default blogRoutes