import React from 'react'
import Graph from '../Graph/Graph'
import HistoryOperations from '../HistoryOperations/HistoryOperations'
import s from './MainPage.module.css'

const MainPage = () => {
  return (
    <div className={s.mainPage}>
      <Graph />
      <HistoryOperations />
    </div>
  )
}

export default MainPage
