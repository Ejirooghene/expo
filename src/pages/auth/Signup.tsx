import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Error } from "../../components";
import user from "/svgs/user.svg";
import mail from "/svgs/mail.svg";
import lock from "/svgs/lock.svg";
import chevronLeft from "/svgs/chevron-left.svg";
import { useFormik } from "formik";
import { useProfile, useOfflineExhibit } from "../../state";
import { registerUser, addCart } from "../../domain";
import * as Yup from "yup";
import gsap from "gsap";

interface SignupProps {}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be less than 30 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required("Password is required"),
});

const Signup: React.FC<SignupProps> = () => {
  const { mutate, isLoading, isError } = registerUser();
  const { mutate: addCartMutate, isLoading: addCartLoading } = addCart();

  const setProfile = useProfile((state) => state.setProfile);
  const id = useProfile((state) => state.info._id);
  const items = useOfflineExhibit((state) => state.items);
  const clearExhibit = useOfflineExhibit((state) => state.clearExhibit);

  const navigate = useNavigate();

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isValid,
  } = useFormik({
    validationSchema,
    validateOnMount: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const ids = items.map((item) => item.id);

      await Promise.all([
        mutate(values, {
          onSuccess: (data) => {
            const { profile } = data.data;
            setProfile(profile);
            // navigate("/preferences");
          },
        }),
        addCartMutate(
          { userId: id, itemId: ids },
          {
            onSuccess: () => {
              clearExhibit();
              navigate("/preferences");
            },
          }
        ),
      ]);
    },
  });

  return (
    <div className="w-1/2 px-12 pt-6 pb-10 overflow-y-auto hide-scrollbar">
      <p className="text-3xl text-black">Create an account</p>
      <Error isError={isError} errorMsg={""} />
      <div className="mt-5">
        <Input
          id="username"
          type="text"
          placeholder="ex: Greatest"
          label="username"
          value={values.username}
          onBlur={handleBlur}
          onChange={handleChange}
          icon={user}
          helperText={
            touched.username && errors.username ? errors.username : ""
          }
        />
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
        <div>
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
        </div>
        <Button
          text="Sign Up"
          disabled={!isValid || isLoading || addCartLoading}
          isLoading={isLoading || addCartLoading}
          onClick={handleSubmit}
        />
        <div
          className="flex items-center gap-1 text-xs text-gray-500 mt-4 cursor-pointer"
          onClick={() =>
            gsap.to(".murale", { x: "calc(100% - 430px)", duration: 0.3 })
          }
        >
          <img src={chevronLeft} className="w-5 mr-6" />
          <p>Click here to</p>
          <p className="text-blue-500">Continue into account</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
