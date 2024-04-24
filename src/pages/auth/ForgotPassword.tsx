import React from "react";
import { Input, Button } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import mail from "/svgs/mail.svg";
import chevleft from "/svgs/chevron-left.svg";
import gsap from "gsap";
import { useMutation } from "react-query";
import axios from "axios";

interface ForgotPasswordProps {
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
})

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const {mutate, isLoading} = useMutation(async (payload: {email: string}): Promise<string> => {
        const res = await axios.post("http://localhost:8080/auth/forgot-password", payload);
        return res.data;
    })
  const { values, handleBlur, handleChange, isValid, touched, errors } = useFormik({
    validationSchema,
    validateOnMount: true,
    initialValues: {
      email: ""
    },
    onSubmit: (values) => {
        mutate(values);
    },
  });
  return (
    <div className="w-1/2 px-12 pt-12">
      <p className="text-3xl text-black">Forgot Something?</p>
      <p className="text-sm mt-3">
        Enter your password below to receive password reset instructions
      </p>
      <Input
        id="email"
        type="email"
        label="email"
        placeholder="Greatest@example.com"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        icon={mail}
        helperText={touched.email && errors.email ? errors.email : ""}
      />
      <Button text="Continue" isLoading={isLoading} disabled={!isValid || isLoading} onClick={() => {}} />
      <div
        className="flex items-center mt-8 cursor-pointer"
        onClick={() =>
          gsap.to(".murale", { x: "calc(100% - 430px)", duration: 0.3 })
        }
      >
        <img src={chevleft} className="w-5 mr-4" />
        <p
          className="text-xs text-gray-500"
        >
          Go Back
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
