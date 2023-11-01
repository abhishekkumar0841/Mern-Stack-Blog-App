import express from 'express'
import { allBlogs, createBlog, deleteBlog, updateBlog, userBlog } from '../controllers/blog.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const blogRoutes = express.Router()

blogRoutes.post('/post', authMiddleware, createBlog)
blogRoutes.get('/', allBlogs)
blogRoutes.get('/user', authMiddleware, userBlog)
blogRoutes.put('/:id',authMiddleware, updateBlog)
blogRoutes.delete('/:id',authMiddleware, deleteBlog)

export default blogRoutes