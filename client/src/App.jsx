import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import CountsPage from './components/layouts/CountsPage/CountsPage'
import ExpensesPage from './components/layouts/ExpensesPage/ExpensesPage'
import IncomesPage from './components/layouts/IncomesPage/IncomesPage'
import LoginPage from './components/layouts/LoginPage/LoginPage'
import ProfilePage from './components/layouts/ProfilePage/ProfilePage'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar/Navbar'
import LogOutPage from './components/layouts/LogOutPage/LogOutPage'
import DataLoader from './components/ui/hoc/DataLoader'
import EditCountPage from './components/EditCountPage/EditCountPage'
import EditOperationPage from './components/EditOperationPage/EditOperationPage'

const App = () => {
  return (
    <div className='container'>
      <DataLoader>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProfilePage />} />
          <Route path='/counts' element={<CountsPage />} />
          <Route path='/counts/edit/:id' element={<EditCountPage />} />
          <Route path='/expenses' element={<ExpensesPage />} />
          <Route path='/operation/edit/:id' element={<EditOperationPage />} />
          <Route path='/incomes' element={<IncomesPage />} />
          <Route path='/login/:type?' element={<LoginPage />} />
          <Route path='/logout' element={<LogOutPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </DataLoader>
      <ToastContainer />
    </div>
  )
}

export default App
