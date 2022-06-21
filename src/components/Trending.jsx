import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Trending = () => {
  const [trending, setTrending] = useState([]);

  const url = "https://api.coingecko.com/api/v3/search/trending";

  useEffect(() => {
    axios.get(url).then((response) => {
      setTrending(response.data.coins);
      console.log(response);
    });
  }, []);

  return (
    <div className="rounded-div my-8 py-12 text-primary">
      <h1 className="text-2xl font-bold">Trending coins</h1>
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
        {trending.map((coin, idx) => (
          <div
            key={idx}
            className="rounded-div shadow-2xl p-4 flex justify-between items-center hover:scale-105 ease-in-out duration-300"
          >
            <div className="flex w-full items-center justify-between">
                <div className="flex">
                  <img
                    className="rounded-full mr-4"
                    src={coin.item.small}
                    alt="/"
                  />
                  <div>
                    <p className="font-bold">{coin.item.name}</p>
                    <p>{coin.item.symbol}</p>
                  </div>
                </div>
              <div className="flex items-center">
                <img
                  className="w-8 mr-2"
                  src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"
                />
                <p>{coin.item.price_btc.toFixed(7)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
