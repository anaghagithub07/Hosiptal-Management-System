import doc1 from '../assets/doc1.png'
import type { Doctor } from '../data/mockData'

interface DoctorsListProps {
  doctors: Doctor[]
}

const DoctorsList = ({ doctors }: DoctorsListProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <h1 className="text-lg font-semibold text-gray-900">Doctors List</h1>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="px-3 py-3 font-medium">#</th>
              <th className="px-3 py-3 font-medium">Doctor</th>
              <th className="px-3 py-3 font-medium">Speciality</th>
              <th className="px-3 py-3 font-medium">Degree</th>
              <th className="px-3 py-3 font-medium">Experience</th>
              <th className="px-3 py-3 font-medium">Fees</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor.id} className="border-b border-gray-100">
                <td className="px-3 py-4 text-gray-600">{index + 1}</td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={doctor.image || doc1}
                      alt={doctor.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">{doctor.name}</span>
                  </div>
                </td>
                <td className="px-3 py-4 text-gray-600">{doctor.speciality}</td>
                <td className="px-3 py-4 text-gray-600">{doctor.degree}</td>
                <td className="px-3 py-4 text-gray-600">{doctor.experience}</td>
                <td className="px-3 py-4 font-medium text-gray-800">${doctor.fees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DoctorsList
