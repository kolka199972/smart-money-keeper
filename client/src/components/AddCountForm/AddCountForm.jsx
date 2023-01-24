import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {createCount} from '../../store/count'
import {typesForCounts} from '../../utils/types'
import {validator} from '../../utils/validator'
import SelectField from '../common/form/SelectField/SelectField'
import TextField from '../common/form/TextField/TextField'
import Modal from '../common/Modal/Modal'
import MyButton from '../MyButton/MyButton'

const AddCountForm = ({activeModal, onToggleModal}) => {
  const [data, setData] = useState({name: '', value: '', type: ''})
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return ''
    dispatch(createCount(data))

    setData({name: '', value: '', type: ''})
    onToggleModal()
  }

  return (
    <div>
      <Modal
        activeModal={activeModal}
        onToggleModal={onToggleModal}
        title='New count'
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
            CREATE
          </MyButton>
        </form>
      </Modal>
    </div>
  )
}

export default AddCountForm
