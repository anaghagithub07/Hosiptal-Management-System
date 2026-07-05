import Appointment from '../models/Appointment.js'

const populateOptions = [
  { path: 'userId', select: 'name email image gender birthday' },
  { path: 'docId', select: 'name image speciality address fees' },
]

const formatUserAppointment = (appointment) => {
  const doctor = appointment.docId
  return {
    _id: appointment._id,
    docId: doctor._id,
    doctorName: doctor.name,
    doctorImage: doctor.image,
    speciality: doctor.speciality,
    address: `${doctor.address.line1}, ${doctor.address.line2}`.replace(/^, |, $/g, ''),
    date: appointment.date,
    time: appointment.time,
    fees: appointment.fees,
    isPaid: appointment.isPaid,
  }
}

const formatAdminAppointment = (appointment, index) => {
  const patient = appointment.userId
  const doctor = appointment.docId
  return {
    id: appointment._id,
    patientName: patient.name,
    patientImage: patient.image || '',
    department: doctor.speciality,
    dateTime: `${appointment.date}, ${appointment.time}`,
    doctorName: doctor.name,
    doctorImage: doctor.image,
    fees: appointment.fees,
    bookedOn: appointment.createdAt.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    index: index + 1,
  }
}

export const createAppointment = async (req, res) => {
  const { docId, date, time } = req.body
  if (!docId || !date || !time) {
    return res.status(400).json({ message: 'Doctor, date and time are required' })
  }

  const doctor = await (await import('../models/Doctor.js')).default.findById(docId)
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' })

  const appointment = await Appointment.create({
    userId: req.user.id,
    docId,
    date,
    time,
    fees: doctor.fees,
  })

  const populated = await Appointment.findById(appointment._id).populate(populateOptions)
  res.status(201).json(formatUserAppointment(populated))
}

export const getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({ userId: req.user.id, cancelled: false })
    .populate(populateOptions)
    .sort({ createdAt: -1 })
  res.json(appointments.map(formatUserAppointment))
}

export const payAppointment = async (req, res) => {
  const appointment = await Appointment.findOne({
    _id: req.params.id,
    userId: req.user.id,
    cancelled: false,
  }).populate(populateOptions)

  if (!appointment) return res.status(404).json({ message: 'Appointment not found' })
  appointment.isPaid = true
  await appointment.save()
  res.json(formatUserAppointment(appointment))
}

export const cancelUserAppointment = async (req, res) => {
  const appointment = await Appointment.findOne({
    _id: req.params.id,
    userId: req.user.id,
    cancelled: false,
  })
  if (!appointment) return res.status(404).json({ message: 'Appointment not found' })
  appointment.cancelled = true
  await appointment.save()
  res.json({ message: 'Appointment cancelled' })
}

export const getAllAppointments = async (_req, res) => {
  const appointments = await Appointment.find({ cancelled: false })
    .populate(populateOptions)
    .sort({ createdAt: -1 })
  res.json(appointments.map((item, index) => formatAdminAppointment(item, index)))
}

export const getLatestAppointments = async (_req, res) => {
  const appointments = await Appointment.find({ cancelled: false })
    .populate(populateOptions)
    .sort({ createdAt: -1 })
    .limit(10)

  res.json(
    appointments.map((item) => ({
      id: item._id,
      doctorName: item.docId.name,
      doctorImage: item.docId.image,
      bookedOn: item.createdAt.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }))
  )
}

export const cancelAdminAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
  if (!appointment) return res.status(404).json({ message: 'Appointment not found' })
  appointment.cancelled = true
  await appointment.save()
  res.json({ message: 'Appointment cancelled' })
}
