import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import paginate from '../../utils/paginate'
import Pagination from '../Pagination/Pagination'
import s from './OperationsList.module.css'

const OperationsList = ({operations, categories}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  if (!operations) {
    return <h1 style={{color: '#b23655', fontSize: '25px'}}>No data!</h1>
  }
  const itemsCount = operations.length
  const pageSize = 10

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const operationsList = paginate(operations, currentPage, pageSize)

  const handleOperationClick = (id) => {
    navigate(`/operation/edit/${id}`)
  }

  return (
    <div>
      <div className={s.header}>
        <div className={s.headerItem}>Date</div>
        <div className={s.headerItem}>Category</div>
        <div className={s.headerItem}>BYN</div>
      </div>
      <ul className={s.operationsList}>
        {operationsList.map((oper) => (
          <li key={oper._id} onClick={() => handleOperationClick(oper._id)}>
            <div className={s.operation}>
              <div className={s.operationItem}>
                {new Date(oper.date).toLocaleDateString()}
              </div>
              <div className={s.operationItem}>
                {categories.find((c) => c._id === oper.category)?.name}
              </div>
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

export default OperationsList
