import React, { useEffect, useState } from 'react'
import TableCoin from '../modules/TableCoin'
import { getCoinList } from '../../services/cryptoApi'
import PaginationSection from '../modules/PaginationSection'

function HomePage() {
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)
    const getData = async()  => {
      const res = await fetch(getCoinList(page))
      const data = await res.json()
      setCoins(data);
      setIsLoading(false)
    }
    getData();
  }, [page])

  return (
    <main>
      <section className='max-w-[1200px] mx-auto px-3'>
        <TableCoin coins={coins} isLoading={isLoading}  />
        <PaginationSection page={page} setPage={setPage} />
      </section>
    </main>
  )
}

export default HomePage