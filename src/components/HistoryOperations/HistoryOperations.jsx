import React, {useState} from 'react'
import expenses from '../../api/mockData/expenses'
import paginate from '../../utils/paginate'
import Pagination from '../Pagination/Pagination'
import s from './HistoryOperations.module.css'

const HistoryOperations = () => {
  const title = 'Expenses'
  const itemsCount = expenses.length
  const pageSize = 10
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const operations = paginate(expenses, currentPage, pageSize)

  return (
    <div className={s.main}>
      <h1 className={s.title}>{title}</h1>

      <div className={s.sort}>
        <div className={s.sortBlock + ' ' + s.active}>By date</div>
        <div className={s.sortBlock}>By category</div>
      </div>

      <div className={s.header}>
        <div className={s.headerItem}>Date</div>
        <div className={s.headerItem}>Category</div>
        <div className={s.headerItem}>BYN</div>
      </div>
      <ul className={s.operationsList}>
        {operations.map((oper) => (
          <li key={oper.id}>
            <div className={s.operation}>
              <div className={s.operationItem}>
                {new Date(oper.date).toLocaleDateString()}
              </div>
              <div className={s.operationItem}>{oper.category}</div>
              <div className={s.operationItem + ' ' + s.price}>
                BYN {oper.value.toFixed(2)}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        itemsCount={itemsCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default HistoryOperations
