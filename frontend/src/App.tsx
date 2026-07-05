import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import SignIn from './Auth/SignIn'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import MyAppoitments from './pages/MyAppoitments'
import Appoitment from './pages/Appoitment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <Navbar />
      <div className={isHome ? '' : 'mx-4 mt-20 sm:mx-[10%]'}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<Profile />} />
          <Route path='/my-appointments' element={<MyAppoitments />} />
          <Route path='/appointment/:docId' element={<Appoitment />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
