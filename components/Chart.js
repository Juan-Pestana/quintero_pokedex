import React from 'react'

import { PolarArea } from 'react-chartjs-2'

export default function Chart({ stats }) {
  let data = {
    labels: [
      'hp',
      'ataque',
      'defensa',
      'ataque especial',
      'defensa especial',
      'velocidad',
    ],
    datasets: [
      {
        label: 'Estadísticas',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  stats.forEach((el) => {
    data.datasets[0].data.push(el.base_stat)
  })

  return (
    <div
      style={{
        width: '90%',
        maxWidth: '500px',
        aspectRatio: '1/1',
        margin: '80px auto auto auto',
      }}
    >
      <PolarArea data={data} height={100} width={100} type="plarArea" />
    </div>
  )
}
