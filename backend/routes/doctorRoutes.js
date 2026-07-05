import { Router } from 'express'
import { getDoctorById, getDoctors } from '../controllers/doctorController.js'

const router = Router()
router.get('/', getDoctors)
router.get('/:id', getDoctorById)
export default router
