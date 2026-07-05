import doc1 from '../assets/doc1.png'
import doc2 from '../assets/doc2.png'
import doc3 from '../assets/doc3.png'
import doc4 from '../assets/doc4.png'
import doc5 from '../assets/doc5.png'
import doc6 from '../assets/doc6.png'
import doc7 from '../assets/doc7.png'
import doc8 from '../assets/doc8.png'
import doc9 from '../assets/doc9.png'
import doc10 from '../assets/doc10.png'
import doc11 from '../assets/doc11.png'
import doc12 from '../assets/doc12.png'
import doc13 from '../assets/doc13.png'
import doc14 from '../assets/doc14.png'
import doc15 from '../assets/doc15.png'
import profilePic from '../assets/profile_pic.png'

const doctorImages = [
  doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8, doc9, doc10, doc11, doc12, doc13, doc14, doc15,
]

export const getDoctorImage = (image?: string, fallbackIndex = 0) => {
  if (image?.trim()) return image
  return doctorImages[fallbackIndex] ?? profilePic
}
