import React, {useEffect, useState} from 'react'
import s from './EditCountPage.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {getCountById, removeCount, updateCount} from '../../store/count'
import {typesForCounts} from '../../utils/types'
import {validator} from '../../utils/validator'
import SelectField from '../common/form/SelectField/SelectField'
import TextField from '../common/form/TextField/TextField'
import MyButton from '../MyButton/MyButton'
import {useNavigate, useParams} from 'react-router-dom'
import Modal from '../common/Modal/Modal'
import {getOperations, removeOperation} from '../../store/operation'

const EditCountPage = () => {
  const {id} = useParams()
  const count = useSelector(getCountById(id))
  if (!count) return 'Loading...'
  const [activeModal, setActiveModal] = useState(false)
  const [data, setData] = useState({
    name: count.name,
    value: count.value,
    type: count.type
  })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const operations = useSelector(getOperations())

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    value: {
      isRequired: {
        message: "Amount shouldn't be empty"
      }
    },
    type: {
      isRequired: {
        message: 'Type should be selected'
      }
    },
    name: {
      isRequired: {
        message: "Name shouldn't be empty"
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

  const toggleModal = () => {
    setActiveModal((pS) => !pS)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return ''
    dispatch(updateCount({...data, _id: count._id}))
    navigate('/counts')
  }

  const handleClick = () => {
    dispatch(removeCount(id))
    operations
      .filter((op) => op.count === id)
      .forEach((op) => dispatch(removeOperation(op._id)))
    navigate('/counts')
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Modal
          activeModal={activeModal}
          onToggleModal={toggleModal}
          title='Are you sure to delete count? All operations with this count will be removed.'
        >
          <MyButton
            style={{
              width: '150px',
              marginTop: '-5px',
              background: '#36b35f'
            }}
            onClick={handleClick}
          >
            DELETE
          </MyButton>
        </Modal>
        <h1 className={s.title}>Edit count</h1>
        <MyButton
          onClick={toggleModal}
          style={{width: '150px', marginRight: '-30px', background: '#36b35f'}}
        >
          DELETE
        </MyButton>
      </div>
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
          label='Balance'
          placeholder='0.00'
          name='value'
          type='number'
          value={data.value}
          onChange={handleChange}
          error={errors.value}
        />

        <SelectField
          label='Select type'
          name='type'
          value={data.type}
          error={errors.type}
          options={typesForCounts}
          onChange={handleChange}
          defaultOption='Choose...'
        />

        <MyButton type='submit' disabled={!isValid}>
          UPDATE
        </MyButton>
      </form>
    </div>
  )
}

export default EditCountPage
