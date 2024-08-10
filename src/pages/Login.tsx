import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext/UserContextProvider";

const Login = () => {
  const { state, dispatch } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = (userId: number) => {
    const user = state.users.find((user) => user.id === userId);

    if (user) {
      dispatch({ type: "SET_CURRENT_USER", payload: user });
      navigate("/"); // Navigate to Dashboard
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <div className="flex gap-4">
        {state.users.map((user) => (
          <button
            key={user.id}
            onClick={() => handleLogin(user.id)}
            className={`${
              user.role === "PM" ? "bg-green-500" : "bg-blue-500"
            } text-white p-4 rounded w-64`}
          >
            Login as {user.name} ({user.role})
          </button>
        ))}
      </div>
    </div>
  );
};

export default Login;
