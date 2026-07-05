import { Router } from 'express'
import {
  getMe,
  loginUser,
  registerUser,
  updateProfile,
  uploadProfileImage,
} from '../controllers/authController.js'
import { protectUser } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = Router()
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protectUser, getMe)
router.put('/profile', protectUser, updateProfile)
router.put('/profile/image', protectUser, upload.single('image'), uploadProfileImage)
export default router
