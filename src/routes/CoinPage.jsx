import axios from "axios";
import React, { useState, useEffect } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FaTwitter, FaFacebook, FaGithub, FaReddit } from "react-icons/fa";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const CoinPage = () => {
  const [coin, setCoin] = useState({}); //using curly braces since it's only for bitcoin
  const params = useParams();

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoin(response.data);
      console.log(response.data);
    });
  }, [url]);

  return (
    <div className="rounded-div m-12 py-8">
      <div className="flex py-8">
        <img className="w-20 mr-4" src={coin.image?.large} alt="/" />
        <div>
          <p className="text-3xl font-bold">{coin?.name}</p>
          <p>({coin.symbol?.toUpperCase()} / USD)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between">
            {coin.market_data?.current_price ? (
              <p className="text-3xl font-bold">
                ${coin.market_data?.current_price.usd.toLocaleString()}
              </p>
            ) : null}
            <p>7 Day Performance</p>
          </div>
          <div>
            {" "}
            <Sparklines data={coin?.market_data?.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Cap</p>
              {coin.market_data?.market_cap ? (
                <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Vol</p>
              {coin.market_data?.total_volume ? (
                <p>{coin.market_data.total_volume.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">24h High</p>
              {coin.market_data?.high_24h ? (
                <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">24h Low</p>
              {coin.market_data?.low_24h ? (
                <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <p className="font-bold text-2xl">Market Stats</p>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Rank</p>
              {coin.market_cap_rank}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hashing Algorithm</p>
              {coin.hashing_algorithm ? <p>{coin.hashing_algorithm}</p> : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Trust Score</p>
              {coin.tickers ? <p>{coin.liquidity_score.toFixed(2)}</p> : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p>Price Change (24H)</p>
              {coin.market_data ? (
                <p>
                  ${coin.market_data.price_change_percentage_24h.toFixed(2)}
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (7D)</p>
              {coin.market_data ? (
                <p>${coin.market_data.price_change_percentage_7d.toFixed(2)}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (14D)</p>
              {coin.market_data ? (
                <p>
                  ${coin.market_data.price_change_percentage_14d.toFixed(2)}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (30D)</p>
              {coin.market_data ? (
                <p>
                  ${coin.market_data.price_change_percentage_30d.toFixed(2)}
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (60D)</p>
              {coin.market_data ? (
                <p>
                  ${coin.market_data.price_change_percentage_60d.toFixed(2)}
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (200D)</p>
              {coin.market_data ? (
                <p>
                  ${coin.market_data.price_change_percentage_200d.toFixed(2)}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-around p-8 text-accent">
            <FaTwitter />
            <FaFacebook />
            <FaGithub />
            <FaReddit />
          </div>
        </div>
      </div>
      {/* About section */}

      <div className="py-4">
        <p className="text-2xl font-bold pb-2">About {coin.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              coin.description ? coin.description.en : ""
            ),
          }}
        ></p>
      </div>
    </div>
  );
};
export default CoinPage;
