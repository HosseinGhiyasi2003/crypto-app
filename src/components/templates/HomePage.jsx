import React, { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/cryptoApi";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(getCoinList());
      const data = await res.json();
      setCoins(data);
      setIsLoading(false)
    };
    getData();
  }, []);

  return (
    <main>
      {isloading ? (
        <h2>loading</h2>
      ) : (
        <section className="max-w-[1200px] mx-auto">
          <TableCoin coins={coins} />
        </section>
      )}
    </main>
  );
}

export default HomePage;
