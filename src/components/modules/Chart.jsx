import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { convertCoins } from "../../helpers/convertCoins";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Chart({ chart, setChart }) {
  const [coinType, setCoinType] = useState("prices");
  // console.log(chart);

  const changeStateHandler = (e) => {
    const newCoinType = e.target.innerText.toLowerCase().replace(" ", "_");
    setCoinType(newCoinType);
  };

  return (
    <div
      className={`w-full h-full  fixed top-0 left-0 px-3 pt-28  ${
        chart ? "backdrop-blur-sm" : ""
      }`}
    >
      <div className="max-w-[1000px] mx-auto border-2 border-[#2b2b2d] rounded-2xl py-4 px-4">
        <div className="flex justify-between mb-5">
          <div className="flex items-center gap-5">
            <img
              src={chart.image}
              className="w-7 h-7 md:w-10 md:h-10"
              alt={chart.name}
            />
            <span className="text-[15px] md:text-[20px] font-semibold">
              {chart.name}
            </span>
          </div>
          <span className="">
            <IoMdClose
              className="text-3xl text-[#2b2b2d] hover:text-[#3c3c3d] cursor-pointer"
              onClick={() => setChart(false)}
            />
          </span>
        </div>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={400}
              height={400}
              data={convertCoins(chart, coinType)}
            >
              <CartesianGrid stroke="#404042" />
              <Line
                type="monotone"
                dataKey={coinType}
                stroke="#3874ff"
                strokeWidth="2px"
              />
              <XAxis dataKey={"date"} hide />
              <YAxis dataKey={coinType} domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-5 text-center justify-center py-7">
          <button
            className={
              coinType === "prices"
                ? "bg-[#3874ff] text-white text-[12px] sm:text-[16px] p-1 font-normal rounded-md"
                : "border-2 border-[#3874ff] text-[#3874ff] text-[12px] sm:text-[16px] p-1 font-normal rounded-md hover:font-bold "
            }
            onClick={changeStateHandler}
          >
            Prices
          </button>
          <button
            className={
              coinType === "market_caps"
                ? "bg-[#3874ff] text-white text-[12px] sm:text-[16px] p-1 font-normal rounded-md"
                : "border-2 border-[#3874ff] text-[rgb(56,116,255)] text-[12px] sm:text-[16px] p-1 font-normal rounded-md hover:font-bold"
            }
            onClick={changeStateHandler}
          >
            Market Caps
          </button>
          <button
            className={
              coinType === "total_volumes"
                ? "bg-[#3874ff] text-white text-[12px] sm:text-[16px] p-1 font-normal rounded-md"
                : "border-2 border-[#3874ff] text-[#3874ff] text-[12px] sm:text-[16px] p-1 font-normal rounded-md hover:font-bold"
            }
            onClick={changeStateHandler}
          >
            Total Volumes
          </button>
        </div>
        {/* <div className="flex justify-around">
          <h2 className="text-[12px] md:text-[18px]">
            <span className="text-[#3874ff] font-semibold">Prices: </span>
            <span>${chart.current_price}</span>
          </h2>
          <h2 className="text-[12px] md:text-[18px]">
            <span className="text-[#3874ff] font-semibold">ATH: </span>
            <span>${chart.ath}</span>
          </h2>
          <h2 className="text-[12px] md:text-[18px]">
            <span className="text-[#3874ff] font-semibold">Market Cap: </span>
            <span>${chart.market_cap}</span>
          </h2>
        </div> */}
      </div>
    </div>
  );
}

export default Chart;
