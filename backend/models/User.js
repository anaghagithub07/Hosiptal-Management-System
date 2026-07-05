import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    gender: { type: String, default: '' },
    birthday: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
)

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.matchPassword = function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)
