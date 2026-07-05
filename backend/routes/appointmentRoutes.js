import { Router } from 'express'
import {
  cancelUserAppointment,
  createAppointment,
  getMyAppointments,
  payAppointment,
} from '../controllers/appointmentController.js'
import { protectUser } from '../middleware/authMiddleware.js'

const router = Router()
router.post('/', protectUser, createAppointment)
router.get('/my', protectUser, getMyAppointments)
router.patch('/:id/pay', protectUser, payAppointment)
router.delete('/:id', protectUser, cancelUserAppointment)
export default router
