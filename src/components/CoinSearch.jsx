import { useState } from "react";
import CoinItem from "./CoinItem";

const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="rounded-div m-4">
      <div className="flex flex-col md:flex-row justify-between text-center py-4 md:text-right ">
        <h1 className="text-2xl font-semibold my-2">Search Crypto</h1>
        <form>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-primary border border-input rounded-2xl shadow-xl w-full py-2 px-4"
            type="text"
            placeholder="Enter a coin"
          />
        </form>
      </div>
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="border-b">
            <th></th>
            <th className="px-4">#</th>
            <th className="text-left">Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h</th>
            <th className="hidden md:table-cell">24h Volume</th>
            <th className="hidden sm:table-cell">Mkt</th>
            <th>1 Week Vol</th>
          </tr>
        </thead>

        <tbody>
          {coins
            .filter((value) => {
              if (searchText === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return value;
              }
            })
            .map((coin) => (
              <CoinItem key={coin.id} coin={coin} />
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default CoinSearch;
