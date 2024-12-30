import React from 'react'
import TableRow from './TableRow'

function TableCoin({coins}) {
  console.log(coins);
  return (
    <table className='border-collapse w-full'>
      <thead className='border-b-2'>
        <tr className='text-[20px]'>
          <th>Coin</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h</th>
          <th>Total Volume</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {coins.map(coin => (
          <TableRow {...coin} />
        ))}
      </tbody>
    </table>
  )
}

export default TableCoin