import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [registerUser, {error, isLoading}] = useRegisterUserMutation()
  // handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Registration logic here
    const data = {
      name,
      email,
      password,
    }
    // console.log(data);
    try {
      const response = await registerUser(data).unwrap();
      console.log(response);
      toast.success(response.message);
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    }
  };

  if (error) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow-2xl bg-white mx-auto p-8">
        <h3 className="text-gray-800 text-xl text-center font-bold sm:text-2xl">
          Register
        </h3>
        <form onClick={handleSubmit} className="max-w-sm mx-auto space-y-5 pt-8">
          {/* name */}
          <div className="w-full flex items-center justify-center gap-2">
            <i className="ri-user-line ri-xl"></i>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          {/* email */}
          <div className="w-full flex items-center justify-center gap-2">
            <i className="ri-mail-line ri-xl"></i>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
          {/* Sign up btn */}
          <button className="btn w-full mx-auto mt-2 bg-green text-white hover:scale-105">
            Create account
          </button>
          <p className="text-center my-2">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
export default Register