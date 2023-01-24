import React, {useEffect, useState} from 'react'
import s from './Pagination.module.css'

const Pagination = ({itemsCount, currentPage, pageSize, onPageChange}) => {
  const pageCount = Math.ceil(itemsCount / pageSize)
  if (pageCount === 1) return null
  const pages = getPages(pageCount)

  useEffect(() => {
    setLimitedPages(getLimitedPages(pages, currentPage))
  }, [currentPage])

  const [limitedPages, setLimitedPages] = useState(
    getLimitedPages(pages, currentPage)
  )

  const decrementPages = () => {
    if (!(limitedPages[0] === 1)) {
      setLimitedPages((ps) => ps.map((p) => p - 1))
    }
  }

  const incrementPages = () => {
    if (!(limitedPages[limitedPages.length - 1] === pages[pages.length - 1])) {
      setLimitedPages((ps) => ps.map((p) => p + 1))
    }
  }

  const getClasses = (page) =>
    `${s.listItem} ${page === currentPage ? s.active : ''}`

  return (
    <nav>
      <ul className={s.list}>
        <li className={s.listItem} onClick={decrementPages}>
          «
        </li>
        {limitedPages.map((page) => (
          <li
            key={page}
            className={getClasses(page)}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}
        <li className={s.listItem} onClick={incrementPages}>
          »
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

function getPages(pageCount) {
  const pages = []
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }
  return pages
}

function getLimitedPages(pages, currentPage) {
  return pages.filter((p) => {
    if (pages.length > 9) {
      if (currentPage <= pages.length - 4 && currentPage >= 5) {
        return p <= currentPage + 4 && p >= currentPage - 4
      } else if (currentPage > 5 && pages.length === currentPage) {
        return p >= currentPage - 8
      } else if (currentPage > 5 && pages.length === currentPage + 1) {
        return p >= currentPage - 7
      } else if (currentPage > 5 && pages.length === currentPage + 2) {
        return p >= currentPage - 6
      } else if (currentPage > 5 && pages.length === currentPage + 3) {
        return p >= currentPage - 5
      } else if (currentPage === 4) {
        return p <= currentPage + 5
      } else if (currentPage === 3) {
        return p <= currentPage + 6
      } else if (currentPage === 2) {
        return p <= currentPage + 7
      } else if (currentPage === 1) {
        return p <= currentPage + 8
      } else {
        return false
      }
    } else {
      return true
    }
  })
}
