import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {getCategoryExpenses} from '../../../store/category'
import {getExpenses} from '../../../store/operation'
import {getDataForDoghnut} from '../../../utils/getDataForDoghnut'
import AddOperationsForm from '../../AddOperationsForm/AddOperationsForm'
import AddOperationButton from '../../common/AddOperationButton/AddOperationButton'
import DoughnutChart from '../../common/DoughnutChart/DoughnutChart'
import HistoryOperations from '../../HistoryOperations/HistoryOperations'
import s from './ExpensesPage.module.css'

const ExpensesPage = () => {
  const [activeModal, setActiveModal] = useState(false)
  const [sort, setSort] = useState('month')
  const categories = useSelector(getCategoryExpenses())
  const operations = useSelector(getExpenses())
  const selectedOperations =
    sort === 'month'
      ? operations.filter(
          (op) =>
            new Date(op.date).getFullYear() === new Date().getFullYear() &&
            new Date(op.date).getMonth() === new Date().getMonth()
        )
      : operations

  const dataForOperations = getDataForDoghnut(selectedOperations, categories)

  const toggleModal = () => {
    setActiveModal((pS) => !pS)
  }
  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.header}>
          <AddOperationButton type='expense' onToggleModal={toggleModal} />
          <div className={s.sort}>
            <div
              className={`${s.sortBlock} ${sort === 'month' ? s.active : ''}`}
              onClick={() => setSort('month')}
            >
              Month
            </div>
            <div
              className={`${s.sortBlock} ${sort === 'month' ? '' : s.active}`}
              onClick={() => setSort('all')}
            >
              All time
            </div>
          </div>
        </div>
        <div className={s.doughnut}>
          <DoughnutChart dataForOperations={dataForOperations} />
        </div>
      </div>

      <AddOperationsForm
        activeModal={activeModal}
        categories={categories}
        onToggleModal={toggleModal}
        type='expense'
      />
      <HistoryOperations
        title='Expenses'
        operations={selectedOperations}
        categories={categories}
      />
    </div>
  )
}

export default ExpensesPage
