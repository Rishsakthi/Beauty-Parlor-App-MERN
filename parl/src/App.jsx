import { useState } from 'react'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Login from './components/Login'
import Register from './components/Register'
import DashboardLayout from "./components/DashboardLayout"
import DashboardHome from "./components/DashboardHome"
import Customers from "./components/Customers"
import AdminServices from "./components/AdminServices"
import Booking from "./components/Booking"
import AppointmentForm from './components/AppointmentForm'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/about' element={<About />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="customers" element={<Customers />} />
          <Route path="AdminServices" element={<AdminServices />} />
          <Route path="booking" element={<Booking />} />
        </Route>

        <Route path='/appointmentform' element={<AppointmentForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App