import jwt from 'jsonwebtoken'

export const protectUser = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' })
  }
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET)
    if (decoded.role !== 'user') return res.status(403).json({ message: 'User access required' })
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' })
  }
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET)
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin access required' })
    req.admin = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
