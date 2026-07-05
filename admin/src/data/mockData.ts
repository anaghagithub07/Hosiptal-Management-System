import doc1 from '../assets/doc1.png'
import profilePic from '../assets/profile_pic.png'

export interface Doctor {
  id: string
  name: string
  image: string
  speciality: string
  degree: string
  experience: string
  fees: number
}

export interface Appointment {
  id: string
  patientName: string
  patientImage: string
  age: number
  department: string
  dateTime: string
  doctorName: string
  doctorImage: string
  fees: number
  bookedOn: string
}

export const doctors: Doctor[] = [
  {
    id: 'doc1',
    name: 'Dr. Richard James',
    image: doc1,
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    fees: 50,
  },
  {
    id: 'doc2',
    name: 'Dr. Emily Larson',
    image: doc1,
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    fees: 60,
  },
  {
    id: 'doc3',
    name: 'Dr. Sarah Patel',
    image: doc1,
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '5 Years',
    fees: 55,
  },
]

export const initialAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientName: 'Richard James',
    patientImage: profilePic,
    age: 28,
    department: 'General Physician',
    dateTime: '24th July, 2024, 10 AM',
    doctorName: 'Dr. Richard James',
    doctorImage: doc1,
    fees: 50,
    bookedOn: '24th July, 2024',
  },
  {
    id: 'apt2',
    patientName: 'Emily Carter',
    patientImage: profilePic,
    age: 32,
    department: 'Gynecologist',
    dateTime: '25th July, 2024, 2 PM',
    doctorName: 'Dr. Emily Larson',
    doctorImage: doc1,
    fees: 60,
    bookedOn: '23rd July, 2024',
  },
]

export const patientCount = 5
