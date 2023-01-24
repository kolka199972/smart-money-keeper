const incomes = [{id: 1, category: 'salary', value: 1000}]

const fetchAll = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(incomes)
    }, 2000)
  })

export default {fetchAll}
