import Doctor from '../models/Doctor.js'
import { uploadImageToCloudinary } from '../utils/uploadToCloudinary.js'

export const getDoctors = async (req, res) => {
  const { speciality } = req.query
  const filter = speciality ? { speciality } : {}
  const doctors = await Doctor.find(filter).sort({ createdAt: -1 })
  res.json(doctors)
}

export const getDoctorById = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id)
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' })
  res.json(doctor)
}

export const createDoctor = async (req, res) => {
  const { name, speciality, degree, experience, about, fees, line1, line2 } = req.body
  if (!name || !speciality || !degree || !experience || !fees) {
    return res.status(400).json({ message: 'Please fill in all required fields' })
  }
  if (!req.file) {
    return res.status(400).json({ message: 'Doctor photo is required' })
  }

  let imageUrl = ''
  try {
    imageUrl = await uploadImageToCloudinary(req.file, 'hospital/doctors')
  } catch (error) {
    console.error('Doctor photo upload failed:', error)
    return res.status(500).json({
      message: error.message || 'Failed to upload doctor photo',
    })
  }

  const doctor = await Doctor.create({
    name: name.trim(),
    speciality: speciality.trim(),
    degree: degree.trim(),
    experience: experience.trim(),
    about: about?.trim() || '',
    fees: Number(fees),
    image: imageUrl,
    address: { line1: line1?.trim() || '', line2: line2?.trim() || '' },
  })

  res.status(201).json(doctor)
}

export const deleteDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id)
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' })
  res.json({ message: 'Doctor removed' })
}
