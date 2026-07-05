import User from '../models/User.js'
import { uploadImageToCloudinary } from '../utils/uploadToCloudinary.js'
import generateToken from '../utils/generateToken.js'

const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  address: user.address,
  gender: user.gender,
  birthday: user.birthday,
  image: user.image,
})

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' })
  }
  const exists = await User.findOne({ email: email.trim().toLowerCase() })
  if (exists) return res.status(400).json({ message: 'An account with this email already exists' })

  const user = await User.create({ name: name.trim(), email: email.trim().toLowerCase(), password })
  const token = generateToken({ id: user._id, role: 'user' })
  res.status(201).json({ token, user: formatUser(user) })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email?.trim() || !password) {
    return res.status(400).json({ message: 'Please enter email and password' })
  }
  const user = await User.findOne({ email: email.trim().toLowerCase() })
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }
  const token = generateToken({ id: user._id, role: 'user' })
  res.json({ token, user: formatUser(user) })
}

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(formatUser(user))
}

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) return res.status(404).json({ message: 'User not found' })

  const { name, phone, address, gender, birthday, image } = req.body
  if (name !== undefined) user.name = name.trim()
  if (phone !== undefined) user.phone = phone.trim()
  if (address !== undefined) user.address = address.trim()
  if (gender !== undefined) user.gender = gender.trim()
  if (birthday !== undefined) user.birthday = birthday.trim()
  if (image !== undefined) user.image = image

  await user.save()
  res.json(formatUser(user))
}

export const uploadProfileImage = async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  if (!req.file) return res.status(400).json({ message: 'Please upload an image' })

  try {
    user.image = await uploadImageToCloudinary(req.file, 'hospital/users')
    await user.save()
    res.json(formatUser(user))
  } catch (error) {
    console.error('Profile photo upload failed:', error)
    res.status(500).json({ message: error.message || 'Failed to upload image' })
  }
}
