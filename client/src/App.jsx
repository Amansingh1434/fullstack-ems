import React from 'react'
import {Toaster} from 'react-hot-toast'
import {Navigate, Route,Routes} from 'react-router-dom'
import LoginLanding from './pages/LoginLanding'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Payslips from './pages/Payslips'
import Leave from './pages/Leave'
import Attendance from './pages/Attendance'
import Employees from './pages/Employees'
import Printpayslip from './pages/Printpayslip'
import LoginForm from './components/LoginForm'

  const App = () => {
  return (
    <>
       <Toaster/>
       <Routes>
        <Route path='/login' element={<LoginLanding/>}/>
        <Route path='/login/admin' element={<LoginForm role='admin' title="Admin Portal" subtitle="Sign in to manage the organization"/>}/>
        <Route path='/login/employee' element={<LoginForm role="employee" title="Employee Portal" subtitle="Sign in to acccess your acount"/>}/>
        <Route element={<Layout/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/employees' element={<Employees/>}/>
          <Route path='/attendance' element={<Attendance/>}/>
          <Route path='/leave' element={<Leave/>}/>
          <Route path='/payslips' element={<Payslips/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Route>
        <Route path='/print/patslips/:id' element={<Printpayslip/>}/>
        <Route path='*' element={<Navigate to='/dashboard' replace/>}/>
       </Routes>
    </>
  )
}

export default App
