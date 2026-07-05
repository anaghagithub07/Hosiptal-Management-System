import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import type { AuthUser } from '../context/authStorage'

const emptyProfile = (user: AuthUser) => ({
  name: user.name,
  phone: user.phone ?? '',
  address: user.address ?? '',
  gender: user.gender ?? '',
  birthday: user.birthday ?? '',
})

const Profile = () => {
  const { user, requireAuth, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState(() => (user ? emptyProfile(user) : null))

  useEffect(() => {
    if (!user) {
      requireAuth(() => navigate('/my-profile'))
    }
  }, [user, requireAuth, navigate])

  useEffect(() => {
    if (user) {
      setForm(emptyProfile(user))
    }
  }, [user])

  const handleFieldChange = useCallback(
    (field: keyof Omit<typeof form & object, never>, value: string) => {
      setForm((prev) => (prev ? { ...prev, [field]: value } : prev))
    },
    []
  )

  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleSave = useCallback(() => {
    if (!form) return

    const success = updateProfile({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      gender: form.gender.trim(),
      birthday: form.birthday.trim(),
    })

    if (success) {
      setIsEditing(false)
    }
  }, [form, updateProfile])

  if (!user || !form) {
    return (
      <div className="py-20 text-center text-gray-500">
        Please sign in to view your profile.
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl py-8"
    >
      <div className="flex h-28 w-28 items-center justify-center rounded bg-[#e8e0f4] sm:h-36 sm:w-36">
        <User className="h-10 w-10 text-gray-400 sm:h-12 sm:w-12" strokeWidth={1.5} />
      </div>

      {isEditing ? (
        <input
          type="text"
          value={form.name}
          onChange={(event) => handleFieldChange('name', event.target.value)}
          className="mt-8 w-full border-b border-gray-200 pb-4 text-2xl font-semibold text-gray-900 outline-none focus:border-blue-400 sm:text-3xl"
        />
      ) : (
        <h1 className="mt-8 border-b border-gray-200 pb-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
          {form.name}
        </h1>
      )}

      <section className="mt-8">
        <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500 underline underline-offset-4">
          Contact Information
        </h2>

        <div className="mt-5 space-y-3 text-sm sm:text-base">
          <div className="flex flex-wrap gap-x-2">
            <span className="font-medium text-gray-800">Email id:</span>
            <span className="text-blue-500">{user.email}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2">
            <span className="font-medium text-gray-800">Phone:</span>
            {isEditing ? (
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => handleFieldChange('phone', event.target.value)}
                placeholder="+1 123 456 7890"
                className="flex-1 rounded border border-gray-200 px-3 py-1.5 text-blue-500 outline-none focus:border-blue-400"
              />
            ) : (
              <span className="text-blue-500">{form.phone || 'Not set'}</span>
            )}
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-x-2">
            <span className="shrink-0 font-medium text-gray-800">Address:</span>
            {isEditing ? (
              <textarea
                value={form.address}
                onChange={(event) => handleFieldChange('address', event.target.value)}
                placeholder="57th Cross, Richmond / Circle, Church Road, London"
                rows={2}
                className="flex-1 resize-none rounded border border-gray-200 px-3 py-1.5 text-gray-600 outline-none focus:border-blue-400"
              />
            ) : (
              <span className="text-gray-600">{form.address || 'Not set'}</span>
            )}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500 underline underline-offset-4">
          Basic Information
        </h2>

        <div className="mt-5 space-y-3 text-sm sm:text-base">
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="font-medium text-gray-800">Gender:</span>
            {isEditing ? (
              <select
                value={form.gender}
                onChange={(event) => handleFieldChange('gender', event.target.value)}
                className="rounded border border-gray-200 px-3 py-1.5 text-gray-600 outline-none focus:border-blue-400"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span className="text-gray-600">{form.gender || 'Not set'}</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2">
            <span className="font-medium text-gray-800">Birthday:</span>
            {isEditing ? (
              <input
                type="text"
                value={form.birthday}
                onChange={(event) => handleFieldChange('birthday', event.target.value)}
                placeholder="20 July, 2024"
                className="rounded border border-gray-200 px-3 py-1.5 text-gray-600 outline-none focus:border-blue-400"
              />
            ) : (
              <span className="text-gray-600">{form.birthday || 'Not set'}</span>
            )}
          </div>
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={handleEdit}
          disabled={isEditing}
          className="rounded-full border border-gray-400 px-8 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!isEditing}
          className="rounded-full border border-gray-400 px-8 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save information
        </button>
      </div>
    </motion.div>
  )
}

export default Profile
