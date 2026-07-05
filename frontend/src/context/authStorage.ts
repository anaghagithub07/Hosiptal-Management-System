export interface AuthUser {
  name: string
  email: string
  phone?: string
  address?: string
  gender?: string
  birthday?: string
  image?: string
}

export interface StoredUser extends AuthUser {
  password: string
}

const USERS_KEY = 'hms_users'
const SESSION_KEY = 'hms_session'

export const getStoredUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]') as StoredUser[]
  } catch {
    return []
  }
}

export const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const getSession = (): AuthUser | null => {
  try {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? (JSON.parse(session) as AuthUser) : null
  } catch {
    return null
  }
}

export const saveSession = (user: AuthUser | null) => {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export const getInitialLetter = (name: string) =>
  name.trim().charAt(0).toUpperCase() || '?'
