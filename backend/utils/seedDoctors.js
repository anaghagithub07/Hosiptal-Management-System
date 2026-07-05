import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Doctor from '../models/Doctor.js'

dotenv.config()

const doctors = [
  { name: 'Dr. Richard James', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', about: 'Committed to comprehensive medical care.', fees: 50, address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Emily Larson', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', about: 'Specialist in women\'s health.', fees: 60, address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Sarah Patel', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', about: 'Expert skin care treatments.', fees: 30, address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Christopher Lee', speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', about: 'Compassionate pediatric care.', fees: 40, address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Jennifer Garcia', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Nervous system specialist.', fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Andrew Williams', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Experienced neurologist.', fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Christopher Davis', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', about: 'Preventive medicine focus.', fees: 50, address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Timothy White', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', about: 'Patient-first gynecology.', fees: 60, address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Ava Mitchell', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', about: 'Modern dermatology care.', fees: 30, address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Jeffrey King', speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', about: 'Pediatric wellness expert.', fees: 40, address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Zoe Kelly', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Advanced neurological care.', fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Patrick Harris', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Collaborative neurology care.', fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Chloe Evans', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', about: 'Trusted primary care.', fees: 50, address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Ryan Martinez', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', about: 'Women\'s health services.', fees: 60, address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { name: 'Dr. Amelia Hill', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', about: 'Skin care specialist.', fees: 30, address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
]

const seedDoctors = async () => {
  await connectDB()
  const count = await Doctor.countDocuments()
  if (count > 0) {
    console.log(`Doctors already seeded (${count}). Skipping.`)
    process.exit(0)
  }
  await Doctor.insertMany(doctors)
  console.log(`Seeded ${doctors.length} doctors`)
  process.exit(0)
}

seedDoctors().catch((e) => { console.error(e); process.exit(1) })
