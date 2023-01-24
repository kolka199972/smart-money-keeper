import React, {useState} from 'react'
import s from './GroupList.module.css'
import Pagination from '../Pagination/Pagination'
import paginate from '../../utils/paginate'

const GroupList = ({onChangeCategory, categories}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsCount = categories.length
  const pageSize = 10
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const categoriesList = paginate(categories, currentPage, pageSize)

  if (!categories) {
    return <h1 style={{color: '#b23655', fontSize: '25px'}}>No categories!</h1>
  }
  return (
    <div>
      <ul>
        {categoriesList.map((c) => (
          <li key={c._id}>
            <div
              onClick={() => onChangeCategory(c._id)}
              className={s.groupItem}
            >
              {c.name}
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        itemsCount={itemsCount}
        onPageChange={handlePageChange}
        pageSize={pageSize}
      />
    </div>
  )
}

export default GroupList
