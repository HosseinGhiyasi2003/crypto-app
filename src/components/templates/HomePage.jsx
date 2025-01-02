import React, { useEffect, useState } from 'react'
import TableCoin from '../modules/TableCoin'
import { getCoinList } from '../../services/cryptoApi'
import PaginationSection from '../modules/PaginationSection'
import SearchBox from '../modules/SearchBox'

function HomePage() {
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState('usd')

  useEffect(() => {
    setIsLoading(true)
    const getData = async()  => {
      try {
        const res = await fetch(getCoinList(page, currency))
      const data = await res.json()
      setCoins(data);
      setIsLoading(false)
      } catch(error) {
        alert(error);
      }
    }
    getData();
  }, [page, currency])

  return (
    <main>
      <section className='max-w-[1200px] mx-auto px-3'>
        <SearchBox currency={currency} setCurrency={setCurrency} />
        <TableCoin coins={coins} isLoading={isLoading} currency={currency} setCurrency={setCurrency}  />
        <PaginationSection page={page} setPage={setPage} />
      </section>
    </main>
  )
}

export default HomePage