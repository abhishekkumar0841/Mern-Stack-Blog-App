import express from 'express'
import { getProfile, login, logout, signup } from '../controllers/user.controller.js'
import upload from '../middlewares/multer.middleware.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const userRoutes = express.Router()

userRoutes.post('/signup', upload.single('avatar'), signup)
userRoutes.post('/login', login)
userRoutes.get('/profile', authMiddleware, getProfile)
userRoutes.get('/logout', authMiddleware, logout)

export default userRoutes