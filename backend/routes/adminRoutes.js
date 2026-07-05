import { Router } from 'express'
import { loginAdmin, getDashboardStats } from '../controllers/adminController.js'
import {
  cancelAdminAppointment,
  getAllAppointments,
  getLatestAppointments,
} from '../controllers/appointmentController.js'
import { createDoctor, deleteDoctor, getDoctors } from '../controllers/doctorController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = Router()
router.post('/login', loginAdmin)
router.get('/dashboard', protectAdmin, getDashboardStats)
router.get('/appointments', protectAdmin, getAllAppointments)
router.get('/appointments/latest', protectAdmin, getLatestAppointments)
router.delete('/appointments/:id', protectAdmin, cancelAdminAppointment)
router.get('/doctors', protectAdmin, getDoctors)
router.post('/doctors', protectAdmin, upload.single('image'), createDoctor)
router.delete('/doctors/:id', protectAdmin, deleteDoctor)
export default router
