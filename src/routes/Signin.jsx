import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth, signIn } from "../context/AuthContext";

const Signin = () => {
  const { signIn } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>
      <div className="max-w-[400px] min-h-[600px] mx-auto px-4 py-20">
        <h1 className="text-xl font-bold">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label>Email</label>
            <div className="relative w-full rounded-2xl shadow-xl my-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary border border-input p-2 rounded-xl w-full"
                type="email"
                placeholder="talha@gmail.com"
              />
              <AiOutlineMail
                size={20}
                className="absolute right-3 top-2 text-gray-400"
              />
            </div>
          </div>
          <div className="my-4">
            <label>Password</label>
            <div className="relative w-full rounded-2xl shadow-xl my-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="bg-primary border border-input p-2 rounded-xl w-full"
                type="password"
                placeholder="icreatedthis123"
              />
              <AiFillLock
                size={20}
                className="absolute right-3 top-2 text-gray-400"
              />
            </div>
          </div>
          <button className="mt-4 border w-full py-2 px-4 rounded-2xl shadow-xl bg-button text-btnText">
            Sign in
          </button>
        </form>
        <p className="py-4">
          Don't have an account?{" "}
          <Link className="text-primary hover:text-blue-600" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Signin;
