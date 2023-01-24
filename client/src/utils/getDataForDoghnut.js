export function getDataForDoghnut(operations, categories) {
  let dataForOperations = []
  for (let i = 0; i < operations.length; i++) {
    if (
      dataForOperations.find(
        (op) =>
          op.category ===
          categories.find((c) => c._id === operations[i].category).name
      )
    ) {
      dataForOperations = dataForOperations.map((op) => {
        if (
          op.category ===
          categories.find((c) => c._id === operations[i].category).name
        ) {
          return {...op, value: op.value + operations[i].value}
        } else {
          return op
        }
      })
    } else {
      dataForOperations.push({
        category: categories.find((c) => c._id === operations[i].category).name,
        value: operations[i].value
      })
    }
  }
  return dataForOperations
}
