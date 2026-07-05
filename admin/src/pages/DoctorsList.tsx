import { getDoctorImage } from '../utils/doctorImage'
import type { AdminDoctor } from '../types'

const DoctorsList = ({ doctors }: { doctors: AdminDoctor[] }) => (
  <div className="rounded-xl bg-white p-6 shadow-sm">
    <h1 className="text-lg font-semibold">Doctors List</h1>
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500">
            <th className="px-3 py-3">#</th>
            <th className="px-3 py-3">Doctor</th>
            <th className="px-3 py-3">Speciality</th>
            <th className="px-3 py-3">Degree</th>
            <th className="px-3 py-3">Experience</th>
            <th className="px-3 py-3">Fees</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d, i) => (
            <tr key={d._id} className="border-b border-gray-100">
              <td className="px-3 py-4">{i + 1}</td>
              <td className="px-3 py-4"><div className="flex items-center gap-2"><img src={getDoctorImage(d.image, i)} alt="" className="h-8 w-8 rounded-full object-cover" /><span>{d.name}</span></div></td>
              <td className="px-3 py-4">{d.speciality}</td>
              <td className="px-3 py-4">{d.degree}</td>
              <td className="px-3 py-4">{d.experience}</td>
              <td className="px-3 py-4">${d.fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default DoctorsList
