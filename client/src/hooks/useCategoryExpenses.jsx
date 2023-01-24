import React, {useContext, useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import categoryExpensesService from '../services/category.expenses.service'

const CategoryExpensesContext = React.createContext()

export const useCategoryExpenses = () => {
  return useContext(CategoryExpensesContext)
}

const CategoryExpensesProvider = ({children}) => {
  const [categoryExpenses, setCategoryExpenses] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryExpensesService.fetchAll()
        setCategoryExpenses(data)
        setIsLoading(false)
      } catch (error) {
        const {message} = error.response.data
        setError(message)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getCategory = (id) => {
    return categoryExpenses.find((c) => c._id === id)
  }

  const createCategory = async (content) => {
    try {
      const data = categoryExpensesService.create(content)
      setCategoryExpenses((pS) => [...pS, data])
      return data
    } catch (error) {
      const {message} = error.response.data
      setError(message)
    }
  }

  const deleteCategory = async (id) => {
    try {
      const data = categoryExpensesService.delete(id)
      setCategoryExpenses((pS) => pS.filter((c) => c._id !== id))
      return data
    } catch (error) {
      const {message} = error.response.data
      setError(message)
    }
  }

  return (
    <CategoryExpensesContext.Provider value={{categoryExpenses, getCategory}}>
      {/* {!isLoading ? children : <h1>Loading...</h1>} */}
      {children}
    </CategoryExpensesContext.Provider>
  )
}

export default CategoryExpensesProvider
