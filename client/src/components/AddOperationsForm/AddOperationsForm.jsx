import React, {useEffect, useState} from 'react'
import TextField from '../common/form/TextField/TextField'
import Modal from '../common/Modal/Modal'
import {validator} from '../../utils/validator'
import SelectField from '../common/form/SelectField/SelectField'
import {useDispatch, useSelector} from 'react-redux'
import MyButton from '../MyButton/MyButton'
import {createOperation} from '../../store/operation'
import {createCategory} from '../../store/category'
import {getAccountCounts, getCountById, updateCount} from '../../store/count'

const AddOperationsForm = ({activeModal, onToggleModal, categories, type}) => {
  const [categoryModal, setCategoryModal] = useState(false)
  const [data, setData] = useState({
    value: '',
    category: '',
    date: '',
    count: ''
  })
  const [dataCategory, setDataCategory] = useState({name: ''})
  const [errors, setErrors] = useState({})
  const [errorsCategory, setErrorsCategory] = useState({})
  const accountCounts = useSelector(getAccountCounts())
  const dispatch = useDispatch()
  const count = useSelector(getCountById(data.count))

  useEffect(() => {
    validate()
  }, [data])

  useEffect(() => {
    validateCategory()
  }, [dataCategory])

  const validatorConfig = {
    value: {
      isRequired: {
        message: "Amount shouldn't be empty"
      }
    },
    category: {
      isRequired: {
        message: 'Category should be selected'
      }
    },
    count: {
      isRequired: {
        message: 'Account should be selected'
      }
    },
    name: {
      isRequired: {
        message: "Name shouldn't be empty"
      }
    },
    date: {
      isRequired: {
        message: 'Date should be selected'
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateCategory = () => {
    const errorsCategory = validator(dataCategory, validatorConfig)
    setErrorsCategory(errorsCategory)
    return Object.keys(errorsCategory).length === 0
  }

  const isValid = Object.keys(errors).length === 0
  const isValidCategory = Object.keys(errorsCategory).length === 0

  const handleChangeOperation = ({target}) => {
    setData((pS) => ({
      ...pS,
      [target.name]: target.value
    }))
  }

  const handleChangeCategory = ({target}) => {
    setDataCategory((pS) => ({
      ...pS,
      [target.name]: target.value
    }))
  }

  const handleSubmitOperation = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return ''

    if (type === 'expense') {
      dispatch(updateCount({...count, value: count.value - data.value}))
      dispatch(createOperation({...data, type: 'expense'}))
    } else {
      dispatch(updateCount({...count, value: count.value + +data.value}))
      dispatch(createOperation({...data, type: 'income'}))
    }

    setData({
      value: '',
      category: '',
      date: '',
      count: ''
    })
    onToggleModal()
  }

  const handleSubmitCategory = (e) => {
    e.preventDefault()
    const isValid = validateCategory()
    if (!isValid) return ''

    if (type === 'expense') {
      dispatch(createCategory({...dataCategory, type: 'expense'}))
    } else {
      dispatch(createCategory({...dataCategory, type: 'income'}))
    }
    setDataCategory({name: ''})
    toggleCategoryModal()
    onToggleModal()
  }

  const toggleCategoryModal = () => {
    setCategoryModal((pS) => !pS)
  }

  const handleCreateCategoryClick = () => {
    toggleCategoryModal()
    onToggleModal()
  }
  return (
    <div>
      <Modal
        activeModal={activeModal}
        onToggleModal={onToggleModal}
        title={`Add ${type}`}
      >
        <form onSubmit={handleSubmitOperation}>
          <TextField
            label='Amount'
            placeholder='0.00'
            name='value'
            type='number'
            value={data.value}
            onChange={handleChangeOperation}
            error={errors.value}
          />
          <SelectField
            label='Category'
            name='category'
            error={errors.category}
            value={data.category}
            options={categories}
            onChange={handleChangeOperation}
            onHandleCreateCategoryClick={handleCreateCategoryClick}
          />

          <SelectField
            label='Select count'
            name='count'
            value={data.count}
            error={errors.count}
            options={accountCounts}
            onChange={handleChangeOperation}
            defaultOption='Choose..'
          />

          <TextField
            label='Date'
            name='date'
            type='date'
            value={data.date}
            error={errors.date}
            onChange={handleChangeOperation}
          />

          <MyButton type='submit' disabled={!isValid}>
            ADD
          </MyButton>
        </form>
      </Modal>

      <Modal
        activeModal={categoryModal}
        onToggleModal={toggleCategoryModal}
        title='Create new category'
      >
        <form onSubmit={handleSubmitCategory}>
          <TextField
            label='Name of new category'
            name='name'
            type='text'
            value={dataCategory.name}
            onChange={handleChangeCategory}
            error={errorsCategory.name}
          />

          <MyButton type='submit' disabled={!isValidCategory}>
            CREATE
          </MyButton>
        </form>
      </Modal>
    </div>
  )
}

export default AddOperationsForm
