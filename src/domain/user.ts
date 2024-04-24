import axios from "axios";
import { useMutation } from "react-query";
import { Profile, Login } from "./type";

export const registerUser = () => {
  const response = useMutation("registerUser", async (payload: Profile) => {
    const res = await axios.post("https://expo-backend-wq1h.onrender.com/auth/signup", payload);
    return res;
  });

  return response;
};


export const loginUser = () => {
    const response = useMutation("loginUser", async (payload: Login) => {
        const res = await axios.post("https://expo-backend-wq1h.onrender.com/auth/signin", payload);
        return res;
    });

    return response;
}