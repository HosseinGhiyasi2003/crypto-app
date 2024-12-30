import React, { useEffect, useState } from 'react'
import TableCoin from '../modules/TableCoin'
import { getCoinList } from '../../services/cryptoApi'

function HomePage() {
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async()  => {
      const res = await fetch(getCoinList())
      const data = await res.json()
      setCoins(data);
      setIsLoading(false)
    }
    getData();
  }, [])

  return (
    <main>
      <section className='max-w-[1200px] mx-auto px-3'>
        <TableCoin coins={coins} isLoading={isLoading} />
      </section>
    </main>
  )
}

export default HomePage