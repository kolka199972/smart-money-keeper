import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {getCategoryIncomes} from '../../../store/category'
import {getIncomes} from '../../../store/operation'
import {getDataForDoghnut} from '../../../utils/getDataForDoghnut'
import AddOperationsForm from '../../AddOperationsForm/AddOperationsForm'
import AddOperationButton from '../../common/AddOperationButton/AddOperationButton'
import DoughnutChart from '../../common/DoughnutChart/DoughnutChart'
import HistoryOperations from '../../HistoryOperations/HistoryOperations'
import s from './IncomesPage.module.css'

const IncomesPage = () => {
  const [activeModal, setActiveModal] = useState(false)
  const [sort, setSort] = useState('month')
  const categories = useSelector(getCategoryIncomes())
  const operations = useSelector(getIncomes())
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
          <AddOperationButton type='income' onToggleModal={toggleModal} />
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
        type='income'
      />
      <HistoryOperations
        title='Incomes'
        operations={selectedOperations}
        categories={categories}
      />
    </div>
  )
}

export default IncomesPage
