import React from "react";
import TableRow from "./TableRow";
import { RotatingLines } from "react-loader-spinner";

function TableCoin({ coins, isLoading }) {
  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <RotatingLines strokeWidth="2" strokeColor="#3874ff" />
        </div>
      ) : (
        <div className="overflow-x-scroll md:overflow-x-hidden">
          {" "}
          {/* Added this div for horizontal scrolling */}
          <table className="border-collapse w-full">
            <thead className="border-b-2 text-left">
              <tr className="text-[15px] md:text-[20px]">
                <th className="px-3 md:px-0 pb-2">Coin</th>
                <th className="px-3 md:px-0 pb-2">Name</th>
                <th className="px-3 md:px-0 pb-2">Price</th>
                <th className="px-3 md:px-0 pb-2">24h</th>
                <th className="px-3 md:px-0 pb-2">Total Volume</th>
                <th className="px-3 md:px-0 pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <TableRow {...coin} key={coin.id} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default TableCoin;
