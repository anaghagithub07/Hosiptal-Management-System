import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    fees: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Appointment', appointmentSchema)
