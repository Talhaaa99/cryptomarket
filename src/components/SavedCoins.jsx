import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const SavedCoins = () => {
  const [coins, setCoins] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCoins(doc.data()?.watchList);
    });
  }, [user?.email]);

  const coinPath = doc(db, "users", `${user.email}`);

  const deleteCoin = async (passedid) => {
    try {
      const result = coins.filter((items) => items.id !== passedid);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      {coins?.length === 0 ? (
        <p>
          You don't have any saved coins. Add a coin to your watch list.{" "}
          <Link to="/Home">Browse Coins</Link>
        </p>
      ) : (
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="px-4">Rank #</th>
              <th className="text-left">Coin</th>
              <th className="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id}>
                <td>{coin?.rank}</td>
                <td>
                  <Link to="/">
                    <div className="flex items-center">
                      <img src={coin?.image} alt="/" className="w-8 mr-4" />
                      <div>
                        <p className="hidden sm:table-cell ">{coin?.name}</p>
                        <p className="text-gray-400 text-sm text-left">
                          {coin?.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td>
                  <AiOutlineClose onClick={() => deleteCoin(coin.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default SavedCoins;
