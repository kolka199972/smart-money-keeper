import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({dataForOperations}) => {
  const labels = []
  const values = []
  dataForOperations.forEach((op) => {
    labels.push(op.category)
    values.push(op.value)
  })
  const data = {
    labels,
    datasets: [
      {
        label: 'BYN of operation',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 255, 52, 0.5)',
          'rgba(255, 204, 0, 0.5)',
          'rgba(153, 102, 0, 0.5)',
          'rgba(255, 103, 0, 0.5)',
          'rgba(204, 153, 0, 0.5)',
          'rgba(102, 51, 0, 0.5)',
          'rgba(255, 0, 0, 0.5)',
          'rgba(255, 0, 102, 0.5)',
          'rgba(255, 0, 153, 0.5)',
          'rgba(255, 0, 255, 0.5)',
          'rgba(204, 0, 204, 0.5)',
          'rgba(204, 0, 255, 0.5)',
          'rgba(153, 0, 204, 0.5)',
          'rgba(153, 0, 255, 0.5)',
          'rgba(102, 0, 255, 0.5)',
          'rgba(0, 204, 255, 0.5)',
          'rgba(102, 255, 255, 0.5)',
          'rgba(0, 255, 204, 0.5)',
          'rgba(0, 255, 102, 0.5)',
          'rgba(0, 153, 153, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 103, 0, 1)',
          'rgba(204, 153, 0, 1)',
          'rgba(102, 51, 0, 1)',
          'rgba(255, 0, 0, 1)',
          'rgba(255, 0, 102, 1)',
          'rgba(255, 0, 153, 1)',
          'rgba(255, 0, 255, 1)',
          'rgba(204, 0, 204, 1)',
          'rgba(204, 0, 255, 1)',
          'rgba(153, 0, 204, 1)',
          'rgba(153, 0, 255, 1)',
          'rgba(102, 0, 255, 1)',
          'rgba(0, 204, 255, 1)',
          'rgba(102, 255, 255, 1)',
          'rgba(0, 255, 204, 1)',
          'rgba(0, 255, 102, 1)',
          'rgba(0, 153, 153, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  if (!dataForOperations.length) {
    return (
      <h1 style={{marginTop: '50px', fontSize: '20px'}}>No operations yet</h1>
    )
  }
  return <Doughnut data={data} />
}

export default DoughnutChart
