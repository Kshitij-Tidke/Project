import React, { useState, useEffect } from "react";
import { Button, InputField, Logo, PasswordToggleIcon } from "../components/index.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      setErrorMessage("Invalid email or password!");
    }
  }, [error]);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setErrorMessage("");

    let hasError = false;

    if (!email) {
      setEmailError(true);
      setEmailErrorMessage("Email is required");
      hasError = true;
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    await dispatch(login({ email, password }));

    if (!error) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-blue-800 rounded-bl-[80px]">
        <div className="pt-20">
          <Logo className={"h-28 pb-5"} />
        </div>
        <div className="text-center text-white text-xl">Online Project Management</div>
      </div>

      <div className="relative w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 sm:p-6">
        <div className="text-xl text-center text-gray-800 font-semibold py-5 mb-5">Login to get started</div>
        <form onSubmit={handleSubmit}>
          <InputField
            iClassName="border rounded-lg"
            className="mb-8"
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            isError={emailError}
            errorMessage={emailErrorMessage}
          />
          <InputField
            iClassName="border rounded-lg"
            className="mb-1"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            icon={<PasswordToggleIcon isVisible={showPassword} onToggle={handlePasswordToggle} />}
            isError={passwordError}
            errorMessage={passwordErrorMessage}
          />
          <div className="flex items-center justify-end mb-4">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <div className="flex justify-center">
            <Button className={"px-20 bg-blue-600 text-white py-2 rounded-3xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"} type="submit" label="Login" />
          </div>
        </form>
        {errorMessage && (
          <div className="mt-4 text-center">
            <p className="text-red-500 text-sm">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
