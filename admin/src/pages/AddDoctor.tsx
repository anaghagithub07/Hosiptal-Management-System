import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Upload, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../store/hooks'
import { addAdminDoctor } from '../store/actions/adminActions'

const AddDoctor = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [degree, setDegree] = useState('MBBS')
  const [experience, setExperience] = useState('')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!image) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(image)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [image])

  const resetForm = () => {
    setName('')
    setSpeciality('')
    setDegree('MBBS')
    setExperience('')
    setFees('')
    setAbout('')
    setLine1('')
    setLine2('')
    setImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      event.target.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5 MB')
      event.target.value = ''
      return
    }
    setImage(file)
  }

  const handleRemoveImage = () => {
    setImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!image) {
      toast.error('Please upload a doctor photo')
      return
    }

    const formData = new FormData()
    formData.append('name', name.trim())
    formData.append('speciality', speciality.trim())
    formData.append('degree', degree.trim())
    formData.append('experience', experience.trim())
    formData.append('fees', fees)
    formData.append('about', about.trim())
    formData.append('line1', line1.trim())
    formData.append('line2', line2.trim())
    formData.append('image', image)

    setSubmitting(true)
    try {
      await dispatch(addAdminDoctor(formData))
      toast.success('Doctor added successfully')
      resetForm()
      navigate('/doctors-list')
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        'Failed to add doctor'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-lg font-semibold">Add Doctor</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Doctor Photo *</p>
          <div className="flex flex-col items-start gap-3">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-[#eaf3fa]">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover object-top" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
                  <Camera className="h-8 w-8" strokeWidth={1.5} />
                  <span className="mt-2 text-xs">No photo</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
              >
                <Upload className="h-4 w-4" />
                {preview ? 'Change photo' : 'Upload photo'}
              </button>
              {preview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  <X className="h-4 w-4" />
                  Remove
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">JPG, PNG or WEBP. Max 5 MB. This photo appears on the website.</p>
        </div>

        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" required />
        <input type="text" placeholder="Speciality" value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" required />
        <input type="text" placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" />
        <input type="text" placeholder="Experience (e.g. 4 Years)" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" required />
        <textarea placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)} rows={3} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" />
        <input type="text" placeholder="Address line 1" value={line1} onChange={(e) => setLine1(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" />
        <input type="text" placeholder="Address line 2" value={line2} onChange={(e) => setLine2(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" />
        <input type="number" placeholder="Fees" value={fees} onChange={(e) => setFees(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" required min={0} />
        <button type="submit" disabled={submitting} className="rounded-full bg-blue-500 px-8 py-2.5 text-sm font-medium text-white disabled:opacity-50">
          {submitting ? 'Adding...' : 'Add Doctor'}
        </button>
      </form>
    </div>
  )
}

export default AddDoctor
