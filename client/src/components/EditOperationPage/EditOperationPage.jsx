import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import Modal from '../common/Modal/Modal'
import s from './EditOperationPage.module.css'
import {validator} from '../../utils/validator'
import MyButton from '../MyButton/MyButton'
import TextField from '../common/form/TextField/TextField'
import SelectField from '../common/form/SelectField/SelectField'
import {
  getOperationById,
  removeOperation,
  updateOperation
} from '../../store/operation'
import {
  createCategory,
  getCategoryExpenses,
  getCategoryIncomes
} from '../../store/category'
import {getAccountCounts, getCountById, updateCount} from '../../store/count'

const EditOperationPage = () => {
  const {id} = useParams()
  const operation = useSelector(getOperationById(id))
  if (!operation) return 'Loading...'
  const [activeModal, setActiveModal] = useState(false)
  const [categoryModal, setCategoryModal] = useState(false)
  const [data, setData] = useState({
    ...operation,
    date: new Date(operation.date).toISOString().split('T')[0]
  })
  const [dataCategory, setDataCategory] = useState({name: ''})
  const [errors, setErrors] = useState({})
  const [errorsCategory, setErrorsCategory] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categotyIncomes = useSelector(getCategoryIncomes())
  const categoryExpenses = useSelector(getCategoryExpenses())
  const accountCounts = useSelector(getAccountCounts())
  const oldCount = useSelector(getCountById(operation.count))
  const currentCount = useSelector(getCountById(data.count))

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

  const validateCategory = () => {
    const errorsCategory = validator(dataCategory, validatorConfig)
    setErrorsCategory(errorsCategory)
    return Object.keys(errorsCategory).length === 0
  }

  const isValid = Object.keys(errors).length === 0
  const isValidCategory = Object.keys(errorsCategory).length === 0

  const handleChangeOperation = ({target}) => {
    setData((pS) => {
      return {...pS, [target.name]: target.value}
    })
  }

  const handleChangeCategory = ({target}) => {
    setDataCategory((pS) => ({
      ...pS,
      [target.name]: target.value
    }))
  }

  const toggleModal = () => {
    setActiveModal((pS) => !pS)
  }

  const toggleCategoryModal = () => {
    setCategoryModal((pS) => !pS)
  }

  const handleSubmitOperation = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return ''

    if (operation.count === data.count) {
      if (operation.value !== +data.value) {
        const difference = +(data.value - operation.value).toFixed(2)
        console.log(currentCount.value - difference)
        if (operation.type === 'expense') {
          dispatch(
            updateCount({
              ...currentCount,
              value: currentCount.value - difference
            })
          )
        } else if (operation.type === 'income') {
          dispatch(
            updateCount({
              ...currentCount,
              value: currentCount.value + difference
            })
          )
        }
      }
    } else {
      if (operation.type === 'expense') {
        dispatch(
          updateCount({...oldCount, value: oldCount.value + operation.value})
        )
        dispatch(
          updateCount({
            ...currentCount,
            value: currentCount.value - +data.value
          })
        )
      } else if (operation.type === 'income') {
        dispatch(
          updateCount({...oldCount, value: oldCount.value - operation.value})
        )
        dispatch(
          updateCount({
            ...currentCount,
            value: currentCount.value + +data.value
          })
        )
      }
    }

    dispatch(updateOperation(data))

    if (operation.type === 'expense') {
      navigate('/expenses')
    } else {
      navigate('/incomes')
    }
  }

  const handleSubmitCategory = (e) => {
    e.preventDefault()
    const isValid = validateCategory()
    if (!isValid) return ''

    if (operation.type === 'expense') {
      dispatch(createCategory({...dataCategory, type: 'expense'}))
    } else {
      dispatch(createCategory({...dataCategory, type: 'income'}))
    }
    setDataCategory({name: ''})
    toggleCategoryModal()
    toggleModal()
  }

  const handleClick = () => {
    if (operation.type === 'expense') {
      dispatch(
        updateCount({...oldCount, value: oldCount.value + operation.value})
      )
    } else {
      dispatch(
        updateCount({...oldCount, value: oldCount.value - operation.value})
      )
    }

    dispatch(removeOperation(id))

    if (operation.type === 'expense') {
      navigate('/expenses')
    } else {
      navigate('/incomes')
    }
  }

  const handleCreateCategoryClick = () => {
    toggleCategoryModal()
    toggleModal()
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Modal
          activeModal={activeModal}
          onToggleModal={toggleModal}
          title='Are you sure to delete operation?'
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
          options={
            operation.type === 'expense' ? categoryExpenses : categotyIncomes
          }
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

export default EditOperationPage
