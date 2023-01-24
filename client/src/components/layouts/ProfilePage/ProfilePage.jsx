import React, {useEffect, useState} from 'react'
import s from './ProfilePage.module.css'
import img from '../../../images/avatarka.jpg'
import {useDispatch, useSelector} from 'react-redux'
import {getUser, removeUser, updateUser} from '../../../store/user'
import MyButton from '../../MyButton/MyButton'
import Modal from '../../common/Modal/Modal'
import TextField from '../../common/form/TextField/TextField'
import {validator} from '../../../utils/validator'
import {clearCategories} from '../../../store/category'
import {clearCounts} from '../../../store/count'
import {clearOperations} from '../../../store/operation'
import {useNavigate} from 'react-router-dom'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser())
  if (!user) return 'Loading...'
  const [activeModalEdit, setActiveModalEdit] = useState(false)
  const [activeModalDelete, setActiveModalDelete] = useState(false)
  const [data, setData] = useState({...user})
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Name shouldn't be empty"
      }
    },
    email: {
      isRequired: {
        message: "Email shouldn't be empty"
      },
      isEmail: {
        message: 'Email is incorrect'
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleChange = ({target}) => {
    setData((pS) => {
      return {...pS, [target.name]: target.value}
    })
  }

  const toggleModalEdit = () => {
    setActiveModalEdit((pS) => !pS)
  }

  const toggleModalDelete = () => {
    setActiveModalDelete((pS) => !pS)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return ''
    dispatch(updateUser(data))
    toggleModalEdit()
  }

  const handleDeleteProfile = () => {
    dispatch(clearCategories())
    dispatch(clearCounts())
    dispatch(clearOperations())
    dispatch(removeUser())
  }

  const handleLogout = () => {
    navigate('/logout')
  }
  return (
    <div className={s.container}>
      <div className={s.blockImage}>
        <img src={img} alt='ava' />
      </div>
      <div className={s.createdDate}>
        Created at {new Date(user.createdAt).toISOString().split('T')[0]}
      </div>
      <div className={s.blockProfile}>
        <div className={s.profileWrapLeft}>
          <div className={s.blockItem}>Name: </div>
          <div className={s.blockItem}>Email: </div>
        </div>
        <div className={s.profileWrapRight}>
          <div className={s.blockItem}>{user.name}</div>
          <div className={s.blockItem}>{user.email}</div>
        </div>
      </div>
      <div className={s.buttons}>
        <MyButton onClick={toggleModalEdit}>EDIT INFORMATION</MyButton>
        <MyButton onClick={toggleModalDelete}>DELETE PROFILE</MyButton>
      </div>
      <div className={s.btnLogout} onClick={handleLogout}>
        <MyButton style={{textAlign: 'center'}} onClick={toggleModalEdit}>
          LOG OUT
        </MyButton>
      </div>
      <Modal
        activeModal={activeModalEdit}
        onToggleModal={toggleModalEdit}
        title='Edit profile information'
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label='Name'
            placeholder='name for count'
            name='name'
            type='text'
            value={data.name}
            error={errors.name}
            onChange={handleChange}
          />

          <TextField
            label='Email'
            name='email'
            type='text'
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />

          <MyButton type='submit' disabled={!isValid}>
            EDIT
          </MyButton>
        </form>
      </Modal>
      <Modal
        activeModal={activeModalDelete}
        onToggleModal={toggleModalDelete}
        title='Are you sure to delete profile? All operations and counts with this count will be removed.'
      >
        <MyButton
          style={{
            width: '150px',
            marginTop: '-5px',
            background: '#36b35f'
          }}
          onClick={handleDeleteProfile}
        >
          DELETE
        </MyButton>
      </Modal>
    </div>
  )
}

export default ProfilePage
