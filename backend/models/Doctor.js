import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    speciality: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    about: { type: String, default: '' },
    fees: { type: Number, required: true, min: 0 },
    address: {
      line1: { type: String, default: '' },
      line2: { type: String, default: '' },
    },
  },
  { timestamps: true }
)

export default mongoose.model('Doctor', doctorSchema)
