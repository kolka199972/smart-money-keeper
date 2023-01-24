const categories = [
  {_id: '1671377137522', type: 'expense', name: 'Food & Drinks'},
  {_id: '1671377217063', type: 'expense', name: 'Charity'},
  {_id: '1671377272988', type: 'expense', name: 'Clothing & Footwear'},
  {_id: '1671377320472', type: 'expense', name: 'Education'},
  {_id: '1671377380990', type: 'expense', name: 'Gifts'},
  {_id: '1671377392712', type: 'expense', name: 'Health & Personal Care'},
  {_id: '1671377404929', type: 'expense', name: 'Sports'},
  {_id: '1671377500920', type: 'expense', name: 'Home & Utilities'},
  {_id: '1671377513238', type: 'expense', name: 'Leisure'},
  {_id: '1671377522668', type: 'expense', name: 'Loans'},
  {_id: '1671377536270', type: 'expense', name: 'Taxes'},
  {_id: '1671377544960', type: 'expense', name: 'Transport'},
  {_id: '1671377555169', type: 'expense', name: 'Other'},
  {_id: '1671377668889', type: 'income', name: 'Salary'},
  {_id: '1671377677720', type: 'income', name: 'Grants'},
  {_id: '1671377687516', type: 'income', name: 'Loans'},
  {_id: '1671377696148', type: 'income', name: 'Reimbursements'},
  {_id: '1671377705494', type: 'income', name: 'Investments'},
  {_id: '1671377714798', type: 'income', name: 'Other'}
]

const fetchAll = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories)
    }, 2000)
  })

export default {fetchAll}
