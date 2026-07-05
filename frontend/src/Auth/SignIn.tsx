import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const SignIn = () => {
  const { user, openAuthModal } = useAuth()
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
