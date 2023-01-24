import React from 'react'
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {useUser} from '../../hooks/useUser'
import {getIsLoggedIn} from '../../store/user'
import s from './Navbar.module.css'

const Navbar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())
  return (
    <>
      {isLoggedIn && (
        <div className={s.navbar}>
          <div className={s.header}>SMART_MONEY_KEEPER</div>
          <ul>
            <li className={s.navItem}>
              <NavLink to='/'>Profile</NavLink>
            </li>
            <li className={s.navItem}>
              <NavLink to='/counts'>Counts</NavLink>
            </li>
            <li className={s.navItem}>
              <NavLink to='/expenses'>Expenses</NavLink>
            </li>
            <li className={s.navItem}>
              <NavLink to='/incomes'>Incomes</NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar
