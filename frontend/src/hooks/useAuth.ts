import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  closeAuthModal,
  logoutUser,
  openAuthModal,
  setPendingPath,
  signIn,
  signUp,
  updateProfile,
  uploadProfileImage,
} from '../store/actions/authActions'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const auth = useAppSelector((state) => state.auth)

  const requireAuth = useCallback(
    (path: string) => {
      if (auth.user) {
        navigate(path)
        return
      }
      dispatch(setPendingPath(path))
      dispatch(openAuthModal('signin'))
    },
    [auth.user, dispatch, navigate]
  )

  const handleSignIn = async (email: string, password: string) => {
    const path = auth.pendingPath
    const ok = await dispatch(signIn(email, password))
    if (ok) {
      toast.success('Welcome back')
      if (path) {
        navigate(path)
        dispatch(setPendingPath(null))
      }
    } else if (auth.error) toast.error(auth.error)
    return ok
  }

  const handleSignUp = async (name: string, email: string, password: string) => {
    const path = auth.pendingPath
    const ok = await dispatch(signUp(name, email, password))
    if (ok) {
      toast.success('Account created successfully')
      if (path) {
        navigate(path)
        dispatch(setPendingPath(null))
      }
    } else if (auth.error) toast.error(auth.error)
    return ok
  }

  return {
    user: auth.user,
    isAuthModalOpen: auth.isAuthModalOpen,
    authModalTab: auth.authModalTab,
    openAuthModal: (tab: 'signin' | 'signup' = 'signin') => dispatch(openAuthModal(tab)),
    closeAuthModal: () => dispatch(closeAuthModal()),
    requireAuth,
    signUp: handleSignUp,
    signIn: handleSignIn,
    updateProfile: (updates: Parameters<typeof updateProfile>[0]) =>
      dispatch(updateProfile(updates)),
    uploadProfileImage: (file: File) => dispatch(uploadProfileImage(file)),
    logout: () => {
      dispatch(logoutUser())
      toast.info('Logged out successfully')
    },
  }
}
