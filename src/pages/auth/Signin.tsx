import React from "react";
import { Input, Button, Error } from "../../components";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import mail from "/svgs/mail.svg";
import lock from "/svgs/lock.svg";
import chveronRight from "/svgs/chevron-right.svg";
import gsap from "gsap";
import { loginUser, addCart } from "../../domain";
import { useProfile, useOfflineExhibit } from "../../state";

interface SigninProps {
  setSignup: (val: boolean) => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signin: React.FC<SigninProps> = ({ setSignup }) => {
  const navigate = useNavigate();
  const setProfile = useProfile((state) => state.setProfile);
  const items = useOfflineExhibit((state) => state.items);
  const clearExhibit = useOfflineExhibit((state) => state.clearExhibit);
  const id = useProfile((state) => state.info._id);

  const { mutate, isLoading, isError, error } = loginUser();
  const { mutate: addCartMutate, isLoading: addCartLoading } = addCart();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    errors,
    touched,
  } = useFormik({
    validationSchema,
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(values) {
      const ids = items.map((item) => item.id);

      // Execute both mutations simultaneously
      await Promise.all([
        mutate(values, {
          onSuccess: (data) => {
            const { profile } = data.data;
            setProfile(profile);
            // navigate("/dashboard/collections/arts");
          },
        }),
        addCartMutate(
          { userId: id, itemId: ids },
          {
            onSuccess: () => {
              clearExhibit();
              navigate("/dashboard/collections/arts");
            },
          }
        ),
      ]);

      // navigate("/dashboard/collections/arts");
    },
  });

  return (
    <div className="w-1/2 px-12 pt-12">
      <p className="text-3xl text-black">Welcome back</p>
      <Error isError={isError} errorMsg={(error as Error)?.message} />
      <form className="mt-5 overflow-scroll">
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
        <Input
          id="password"
          type="password"
          placeholder="✽✽✽✽✽✽✽✽✽✽"
          label="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          icon={lock}
          helperText={
            touched.password && errors.password ? errors.password : ""
          }
        />
        <p
          className="text-xs text-blue-500 mt-3 cursor-pointer"
          onClick={() => {
            setSignup(false);
            gsap.to(".murale", { x: "-100%", duration: 0.3 });
          }}
        >
          Forgot Password?
        </p>
        <Button
          text="Sign In"
          disabled={!isValid || isLoading || addCartLoading}
          isLoading={isLoading || addCartLoading}
          onClick={handleSubmit}
        />
        <div
          className="flex items-center gap-1 text-xs text-gray-500 mt-6 cursor-pointer"
          onClick={() => {
            setSignup(true);
            gsap.to(".murale", { x: "-100%", duration: 0.3 });
          }}
        >
          <p>Click here to</p>
          <p className="text-blue-500">Create an account</p>
          <img src={chveronRight} className="w-5 ml-6" />
        </div>
      </form>
    </div>
  );
};

export default Signin;
