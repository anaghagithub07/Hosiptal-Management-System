import { useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'

import { Camera, User } from 'lucide-react'

import { toast } from 'react-toastify'

import { useAuth } from '../hooks/useAuth'

import { getUserImage } from '../utils/doctorImage'

import type { AuthUser } from '../types'



const emptyProfile = (user: AuthUser) => ({

  name: user.name,

  phone: user.phone ?? '',

  address: user.address ?? '',

  gender: user.gender ?? '',

  birthday: user.birthday ?? '',

})



const Profile = () => {

  const { user, requireAuth, updateProfile, uploadProfileImage } = useAuth()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isEditing, setIsEditing] = useState(false)

  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState(() => (user ? emptyProfile(user) : null))



  useEffect(() => {

    if (!user) requireAuth('/my-profile')

  }, [user, requireAuth])



  useEffect(() => {

    if (user) setForm(emptyProfile(user))

  }, [user])



  const handleSave = async () => {

    if (!form) return

    const ok = await updateProfile({

      name: form.name.trim(),

      phone: form.phone.trim(),

      address: form.address.trim(),

      gender: form.gender.trim(),

      birthday: form.birthday.trim(),

    })

    if (ok) {

      toast.success('Profile saved successfully')

      setIsEditing(false)

    } else {

      toast.error('Failed to save profile')

    }

  }



  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0]

    event.target.value = ''

    if (!file) return



    if (!file.type.startsWith('image/')) {

      toast.error('Please select an image file')

      return

    }

    if (file.size > 5 * 1024 * 1024) {

      toast.error('Image must be smaller than 5 MB')

      return

    }



    setUploading(true)

    const ok = await uploadProfileImage(file)

    setUploading(false)

    if (ok) toast.success('Profile photo updated')

    else toast.error('Failed to upload photo')

  }



  if (!user || !form) {

    return <div className="py-20 text-center text-gray-500">Please sign in to view your profile.</div>

  }



  const profileImage = getUserImage(user.image)



  return (

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl py-8">

      <div className="relative inline-block">

        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded bg-[#e8e0f4] sm:h-36 sm:w-36">

          {profileImage ? (

            <img src={profileImage} alt={user.name} className="h-full w-full object-cover" />

          ) : (

            <User className="h-10 w-10 text-gray-400 sm:h-12 sm:w-12" strokeWidth={1.5} />

          )}

        </div>

        <button

          type="button"

          onClick={() => fileInputRef.current?.click()}

          disabled={uploading}

          className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600 disabled:opacity-60"

          aria-label="Upload profile photo"

        >

          <Camera className="h-4 w-4" />

        </button>

        <input

          ref={fileInputRef}

          type="file"

          accept="image/*"

          onChange={handleImageSelect}

          className="hidden"

        />

      </div>

      {uploading && <p className="mt-2 text-sm text-gray-500">Uploading photo...</p>}



      {isEditing ? (

        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-8 w-full border-b border-gray-200 pb-4 text-2xl font-semibold outline-none sm:text-3xl" />

      ) : (

        <h1 className="mt-8 border-b border-gray-200 pb-4 text-2xl font-semibold sm:text-3xl">{form.name}</h1>

      )}

      <section className="mt-8">

        <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500 underline underline-offset-4">Contact Information</h2>

        <div className="mt-5 space-y-3 text-sm sm:text-base">

          <div><span className="font-medium">Email id:</span> <span className="text-blue-500">{user.email}</span></div>

          <div className="flex flex-wrap gap-x-2">

            <span className="font-medium">Phone:</span>

            {isEditing ? <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded border border-gray-200 px-3 py-1.5 text-blue-500 outline-none" /> : <span className="text-blue-500">{form.phone || 'Not set'}</span>}

          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-x-2">

            <span className="font-medium">Address:</span>

            {isEditing ? <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} className="flex-1 rounded border border-gray-200 px-3 py-1.5 outline-none" /> : <span className="text-gray-600">{form.address || 'Not set'}</span>}

          </div>

        </div>

      </section>

      <section className="mt-10">

        <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500 underline underline-offset-4">Basic Information</h2>

        <div className="mt-5 space-y-3 text-sm sm:text-base">

          <div className="flex flex-wrap gap-x-2">

            <span className="font-medium">Gender:</span>

            {isEditing ? (

              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="rounded border border-gray-200 px-3 py-1.5">

                <option value="">Select gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>

              </select>

            ) : (

              <span className="text-gray-600">{form.gender || 'Not set'}</span>

            )}

          </div>

          <div className="flex flex-wrap gap-x-2">

            <span className="font-medium">Birthday:</span>

            {isEditing ? <input type="text" value={form.birthday} onChange={(e) => setForm({ ...form, birthday: e.target.value })} className="rounded border border-gray-200 px-3 py-1.5 outline-none" /> : <span className="text-gray-600">{form.birthday || 'Not set'}</span>}

          </div>

        </div>

      </section>

      <div className="mt-12 flex gap-4">

        <button type="button" onClick={() => setIsEditing(true)} disabled={isEditing} className="rounded-full bg-gray-100 px-8 py-2.5 text-sm font-medium hover:bg-gray-200 disabled:opacity-50">Edit</button>

        <button type="button" onClick={handleSave} disabled={!isEditing} className="rounded-full bg-blue-500 px-8 py-2.5 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50">Save information</button>

      </div>

    </motion.div>

  )

}



export default Profile

