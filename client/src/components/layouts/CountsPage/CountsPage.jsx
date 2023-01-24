import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {
  getAccountCounts,
  getDebtCounts,
  getSavingCounts
} from '../../../store/count'
import AddCountForm from '../../AddCountForm/AddCountForm'
import CountCard from '../../CountCard/CountCard'
import s from './CountsPage.module.css'

const CountsPage = () => {
  const [activeModal, setActiveModal] = useState(false)
  const accountCounts = useSelector(getAccountCounts())
  const debtCounts = useSelector(getDebtCounts())
  const savingCounts = useSelector(getSavingCounts())

  const textWarning = 'No count has been created yet. Create your first count'

  const toggleModal = () => {
    setActiveModal((pS) => !pS)
  }
  return (
    <div className={s.container}>
      <div className={s.buttonCreate}>
        <button onClick={toggleModal}>+</button>
        <p>Add new count</p>
      </div>
      <div className={s.card}>
        <h1>Actives: </h1>
        <div className={s.cardItem}>
          {accountCounts.length < 1 && (
            <p className={s.textWarning}>{textWarning}</p>
          )}
          {accountCounts.map((ac) => (
            <CountCard key={ac._id} {...ac} />
          ))}
        </div>
      </div>
      <div className={s.card}>
        <h1>Debts: </h1>
        <div className={s.cardItem}>
          {debtCounts.length < 1 && (
            <p className={s.textWarning}>{textWarning}</p>
          )}
          {debtCounts.map((ac) => (
            <CountCard key={ac._id} {...ac} />
          ))}
        </div>
      </div>
      <div className={s.card}>
        <h1>Savings: </h1>
        <div className={s.cardItem}>
          {savingCounts.length < 1 && (
            <p className={s.textWarning}>{textWarning}</p>
          )}
          {savingCounts.map((ac) => (
            <CountCard key={ac._id} {...ac} />
          ))}
        </div>
      </div>
      <AddCountForm activeModal={activeModal} onToggleModal={toggleModal} />
    </div>
  )
}

export default CountsPage
