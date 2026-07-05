import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import {
  doctors as initialDoctors,
  initialAppointments,
  patientCount,
  type Appointment,
  type Doctor,
} from './data/mockData'
import AddDoctor from './pages/AddDoctor'
import Appointments from './pages/Appointments'
import Dashboard from './pages/Dashboard'
import DoctorsList from './pages/DoctorsList'
import Login from './pages/Login'
import doc1 from './assets/doc1.png'

const App = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors)
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((item) => item.id !== id))
  }

  const addDoctor = (doctor: Doctor) => {
    setDoctors((prev) => [...prev, { ...doctor, image: doctor.image || doc1 }])
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Dashboard
                doctorCount={doctors.length}
                appointmentCount={appointments.length}
                patientCount={patientCount}
                latestAppointments={appointments}
                onCancelAppointment={cancelAppointment}
              />
            }
          />
          <Route
            path="appointments"
            element={
              <Appointments
                appointments={appointments}
                onCancelAppointment={cancelAppointment}
              />
            }
          />
          <Route path="add-doctor" element={<AddDoctor onAddDoctor={addDoctor} />} />
          <Route path="doctors-list" element={<DoctorsList doctors={doctors} />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
