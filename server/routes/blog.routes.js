import express from 'express'
import { allBlogs, createBlog, deleteBlog, getBlogById, updateBlog, userBlog } from '../controllers/blog.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import { allComments, createComment } from '../controllers/comment.controller.js'
import {  allLikedUsers, checkUserLikeOnBlog, like, removeLike } from '../controllers/like.controller.js'

const blogRoutes = express.Router()

blogRoutes.post('/post', authMiddleware, createBlog)
blogRoutes.get('/', allBlogs)
blogRoutes.get('/:id', getBlogById)
blogRoutes.get('/user', authMiddleware, userBlog)
blogRoutes.put('/:id',authMiddleware, updateBlog)
blogRoutes.delete('/:id',authMiddleware, deleteBlog)

// *****COMMENT ROUTES*******
blogRoutes.post('/comment/:id', authMiddleware, createComment)
blogRoutes.get('/comment/:id', authMiddleware, allComments)

//*******LIKE ROUTES******** */
blogRoutes.post('/like/:id', authMiddleware, like)
blogRoutes.get('/like/:id', allLikedUsers)
blogRoutes.delete('/like/:id', authMiddleware, removeLike)
blogRoutes.get('/like/user/:id', authMiddleware, checkUserLikeOnBlog)

export default blogRoutes