import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

interface mainProps {}

const main: React.FC<mainProps> = () => {
  const navigate = useNavigate();

  const [signin] = useState<boolean>(true);
  const [signup, setSignup] = useState<boolean>(false);

  return (
    <div className="max-h-screen">
      <div
        className="h-screen flex justify-center items-center bg-contain bg-center"
        style={{ backgroundImage: "url(/images/bg.jpg)" }}
      >
        <div className="w-[60%] h-[60%] flex bg-[#E5E7E6] border-2 border-white rounded-xl overflow-hidden shadow-2xl relative">
          <div
            className="w-1/2 h-full bg-white bg-contain bg-no-repeat bg-center absolute right-0 murale cursor-pointer"
            style={{ backgroundImage: "url(/images/cent.png)" }}
            onClick={() => navigate("/")}
          >
            <span className="inline-block text-xs text-gray-300 px-5 py-5">Click to go back</span>
          </div>
          {signin ? <Signin setSignup={setSignup} /> : <ResetPassword />}
          {signup ? <Signup /> : <ForgotPassword />}
        </div>
      </div>
    </div>
  );
};

export default main;
