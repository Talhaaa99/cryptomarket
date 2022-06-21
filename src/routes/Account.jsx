import SavedCoins from "../components/SavedCoins";
import { UserAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  if (user) {
    return (
      <div className="max-w-[1140px] mx-auto">
        <div className="flex justify-between items-center py-8 my-12 rounded-div">
          <div>
            <h1 className="text-2xl font-bold py-4">Account</h1>
            <div>
              <p>Welcome, {user?.email}</p>
            </div>
          </div>
          <div>
            <button
              onClick={handleSignOut}
              className="border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl"
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center py-8 my-12 rounded-div">
          <div className="min-h-[300px] w-full">
            <p className="font-bold text-2xl py-4">Watch List</p>
            <SavedCoins />
          </div>
        </div>
      </div>
    );
  } else {
    <Navigate to="/signin" />;
  }
};
export default Account;
