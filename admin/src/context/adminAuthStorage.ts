const SESSION_KEY = 'hms_admin_session'

export const getAdminSession = () =>
  localStorage.getItem(SESSION_KEY) === 'true'

export const saveAdminSession = (isLoggedIn: boolean) => {
  if (isLoggedIn) {
    localStorage.setItem(SESSION_KEY, 'true')
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export const getAdminCredentials = () => ({
  email: import.meta.env.VITE_ADMIN_EMAIL ?? '',
  password: import.meta.env.VITE_ADMIN_PASSWORD ?? '',
})
