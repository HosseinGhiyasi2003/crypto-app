import { useEffect, useState } from "react";
import { searchApi } from "../../services/cryptoApi";
import { RotatingLines } from "react-loader-spinner";

function SearchBox({ currency, setCurrency }) {
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
        console.log(data.coins);
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

  return (
    <div className="relative my-14">
      <input
        type="text"
        placeholder="Search"
        className="bg-[#23242e] h-[50px] rounded-md w-[300px] p-3 mr-4 text-[16px] outline-none"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select
        value={currency}
        className="bg-[#23242e] h-[50px] rounded-md p-3 font-semibold text-[16px]"
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {/* Always render the dropdown if there's a search text */}
      {searchText && (
        <div className="w-[300px] bg-[#18181c] overflow-y-scroll h-[400px] absolute top-[60px] p-3 border-2 border-[#22262e]">
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
                  className="flex gap-7 border-b-2 border-[#22262e] py-4"
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