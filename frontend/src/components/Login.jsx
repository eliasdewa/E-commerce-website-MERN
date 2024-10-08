import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { toast } from "react-toastify";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const [loginUser, {isLoading}] = useLoginUserMutation()
  const dispatch = useDispatch();

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    }
    // console.log({ email, password });
    // login logic here
    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
      // destructure token and user data
      const {token, user} = response;
      dispatch(setUser({user}))
      toast.success(response.message);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow-2xl bg-white mx-auto p-8">
        <h3 className="text-gray-800 text-xl text-center font-bold sm:text-2xl">
          Please Login
        </h3>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-5 pt-8">
          {/* email */}
          <div className="w-full flex items-center justify-center gap-2">
            <i className="ri-mail-line ri-xl"></i>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          {/* password */}
          <div className="w-full flex items-center justify-center gap-2">
            <i className="ri-lock-line ri-xl"></i>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          {/* login btn */}
          <button type="submit" className="btn w-full mx-auto mt-2 bg-green text-white hover:scale-105">
            Login
          </button>
          <p className="text-center my-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1"
            >
              Sign Up Here
            </Link>{" "}
          </p>
        </form>
      </div>
    </section>
  );
};
export default Login;
