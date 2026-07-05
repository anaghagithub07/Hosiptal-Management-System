import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SignIn = () => {
  const { openAuthModal, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
      return
    }
    openAuthModal('signin')
    navigate('/')
  }, [openAuthModal, navigate, user])

  return null
}

export default SignIn
