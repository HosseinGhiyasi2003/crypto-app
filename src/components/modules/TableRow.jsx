import chartDown from "../../assets/chart-down.svg";
import chartUp from "../../assets/chart-up.svg";
import { BsCurrencyDollar, BsCurrencyEuro } from "react-icons/bs";
import { PiCurrencyJpy } from "react-icons/pi";
import { marketChart } from "../../services/cryptoApi";

function TableRow({
  id,
  image,
  symbol,
  name,
  current_price,
  price_change_percentage_24h: price_change,
  total_volume,
  ath,
  market_cap,
  currency,
  setChart,
}) {
  const chartHanlder = async () => {
    try {
      const res = await fetch(marketChart(id));
      const data = await res.json();
      console.log({ ...data, name, image, ath, market_cap, current_price });
      setChart({ ...data, name, image, ath, market_cap, current_price });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className="border-b-[1px] border-[#22262e] h-20 text-[1.1rem] font-semibold">
      <td
        className="flex mt-6 gap-2 px-3 md:px-0 cursor-pointer"
        onClick={chartHanlder}
      >
        <img src={image} alt="" className="w-6 h-6" />
        <span className="text-[#9fa6b7] text-[15px] md:text-[20px] pr-4">
          {symbol.toUpperCase()}
        </span>
      </td>
      <td className="px-2 md:px-0 text-[12px] md:text-[20px]">{name}</td>
      <td className="px-3 md:px-0 flex items-center">
        {currency == "usd" ? (
          <BsCurrencyDollar />
        ) : currency == "eur" ? (
          <BsCurrencyEuro />
        ) : (
          <PiCurrencyJpy />
        )}{" "}
        {current_price.toLocaleString()}
      </td>
      <td
        className={
          price_change > 0
            ? "text-green-500 px-3 md:px-0"
            : "text-[#d33636] px-3 md:px-0"
        }
      >
        {price_change.toFixed(2)}%
      </td>
      <td className="px-3 md:px-0">{total_volume.toLocaleString()}</td>
      <td className="px-3 md:px-0 w-16 flex justify-center items-center">
        {" "}
        {/* Set a fixed width and use flexbox */}
        <img
          src={price_change > 0 ? chartUp : chartDown}
          alt=""
          className="w-full h-6" // Set width and height for the image
        />
      </td>
    </tr>
  );
}

export default TableRow;
