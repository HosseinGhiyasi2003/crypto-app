import { useEffect, useState } from "react";
import { marketChart, searchApi } from "../../services/cryptoApi";
import { RotatingLines } from "react-loader-spinner";

function SearchBox({ currency, setCurrency, setChart, transformedCoins }) {
  // console.log(transformedCoins);
  const [searchText, setSearchText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!searchText) {
      setIsLoading(false);
      return;
    }
    const search = async () => {
      try {
        const res = await fetch(searchApi(searchText), {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.coins) {
          setCoins(data.coins);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    search();
    return () => {
      controller.abort();
    };
  }, [searchText]);
  // console.log(coins);

  const showHandler = async (id, image, name) => {
    const filteredData = transformedCoins.filter(data => data.id === id)
    // const ath =  filteredData[0].ath;
    // console.log(filteredData[0].ath);
    // const current_price = filteredData[0].current_price;
    // const market_cap = filteredData[0].market_cap;
    // console.log(ath);
    // console.log(current_price);
    // console.log(market_cap);
    try {
      const res = await fetch(marketChart(id));
      const data = await res.json();
      setChart({ ...data, name, image,});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative mb-14 mt-32">
      <input
        type="text"
        placeholder="Search"
        className="bg-[#23242e] h-[50px] rounded-md w-[300px] p-3 mr-4 text-[16px] outline-none"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select
        value={currency}
        className="bg-[#23242e] h-[50px] rounded-md p-3 font-semibold text-[16px] block sm:inline-block w-24 mt-3 sm:mt-0"
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {/* Always render the dropdown if there's a search text */}
      {searchText && (
        <div className="w-[300px] bg-[#18181c] overflow-y-scroll h-[400px] absolute top-[120px] border-2 border-[#22262e] sm:top-[60px] rounded-md">
          {isLoading ? (
            <div className="flex justify-center">
              <RotatingLines
                width="50px"
                height="50px"
                strokeWidth="2"
                strokeColor="#3874ff"
              />
            </div>
          ) : coins.length > 0 ? (
            <ul className="">
              {coins.map((coin) => (
                <li
                key={coin.id}
                className="flex gap-7 border-b-2 border-[#22262e] p-4 cursor-pointer hover:bg-[#18172c]"
                onClick={() => showHandler(coin.id, coin.thumb, coin.name)} // Pass all three parameters
              >
                <img src={coin.thumb} alt={coin.name} className="w-6 h-6" />
                <span className="text-center">{coin.name}</span>
              </li>
              ))}
            </ul>
          ) : (
            <h3>No results</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;