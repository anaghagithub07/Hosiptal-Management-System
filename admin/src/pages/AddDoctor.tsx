import { useState } from 'react'
import { toast } from 'react-toastify'
import type { Doctor } from '../data/mockData'

interface AddDoctorProps {
  onAddDoctor: (doctor: Doctor) => void
}

const AddDoctor = ({ onAddDoctor }: AddDoctorProps) => {
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [degree, setDegree] = useState('MBBS')
  const [experience, setExperience] = useState('')
  const [fees, setFees] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!name.trim() || !speciality.trim() || !experience.trim() || !fees.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    onAddDoctor({
      id: crypto.randomUUID(),
      name: name.trim(),
      image: '',
      speciality: speciality.trim(),
      degree: degree.trim(),
      experience: experience.trim(),
      fees: Number(fees),
    })

    toast.success('Doctor added successfully')
    setName('')
    setSpeciality('')
    setDegree('MBBS')
    setExperience('')
    setFees('')
  }

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6">
      <h1 className="text-lg font-semibold text-gray-900">Add Doctor</h1>
      <p className="mt-1 text-sm text-gray-500">
        Add a new doctor to the hospital panel.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Dr. John Smith"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Speciality
          </label>
          <input
            type="text"
            value={speciality}
            onChange={(event) => setSpeciality(event.target.value)}
            placeholder="General physician"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Degree
            </label>
            <input
              type="text"
              value={degree}
              onChange={(event) => setDegree(event.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Experience
            </label>
            <input
              type="text"
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              placeholder="4 Years"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Appointment Fees ($)
          </label>
          <input
            type="number"
            value={fees}
            onChange={(event) => setFees(event.target.value)}
            placeholder="50"
            min="0"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-blue-500 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
        >
          Add Doctor
        </button>
      </form>
    </div>
  )
}

export default AddDoctor
