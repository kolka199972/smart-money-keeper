import React, {useState} from 'react'
import GroupList from '../GroupList/GroupList'
import OperationsList from '../OperationsList/OperationsList'
import s from './HistoryOperations.module.css'

const HistoryOperations = ({title, operations, categories}) => {
  const [selectedSortBlock, setSelectedSortBlock] = useState('date')
  const [selectedCategory, setSelectedCategory] = useState(undefined)

  const filteredOperations = selectedCategory
    ? operations.filter((e) => e.category === selectedCategory)
    : operations

  const sortedOperations = filteredOperations.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const changeSort = (sort) => {
    if (selectedSortBlock !== sort) {
      setSelectedSortBlock(sort)
      setSelectedCategory(undefined)
    }
  }

  return (
    <div className={s.main}>
      <h1 className={s.title}>{title}</h1>

      <div className={s.sort}>
        <div
          className={`${s.sortBlock} ${
            selectedSortBlock === 'date' ? s.active : ''
          }`}
          onClick={() => changeSort('date')}
        >
          By date
        </div>
        <div
          className={`${s.sortBlock} ${
            selectedSortBlock === 'date' ? '' : s.active
          }`}
          onClick={() => changeSort('category')}
        >
          By category
        </div>
      </div>

      {selectedSortBlock === 'category' && !selectedCategory && (
        <GroupList
          onChangeCategory={setSelectedCategory}
          categories={categories}
        />
      )}
      {(selectedSortBlock === 'date' || selectedCategory) && (
        <OperationsList operations={sortedOperations} categories={categories} />
      )}
    </div>
  )
}

export default HistoryOperations
