import express from 'express'
import contactUsMessage from '../controllers/contactUs.controller.js';

const otherRoutes = express.Router();

otherRoutes.post('/contact', contactUsMessage)

export default otherRoutes