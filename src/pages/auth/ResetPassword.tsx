import React from 'react';
import { useFormik } from 'formik';
import { Input, Button } from '../../components';
import mail from "/svgs/mail.svg";
import chevright from "/svgs/chevron-right.svg";

interface ResetPasswordProps {
 
};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
    const { values, handleBlur, handleChange } = useFormik({
        initialValues: {
          OTP: "",
        },
        onSubmit: () => {},
      });
      return (
        <div className="w-1/2 px-12 pt-12">
          <p className="text-3xl text-black">Verify OTP</p>
          <p className="text-sm mt-3">
            Enter the OTP(one time password) sent to your email below to reset your password
          </p>
          <Input
            id="OTP"
            type="email"
            label="OTP"
            placeholder="1234"
            value={values.OTP}
            onBlur={handleBlur}
            onChange={handleChange}
            icon={mail}
            helperText=""
          />
          <Button text="Continue" isLoading={false} disabled={true} onClick={() => {}} />
          <div className="flex items-center mt-8 cursor-pointer" onClick={() => gsap.to(".murale", { left: 0, duration: 0.3 })}>
            <p className="text-xs text-gray-500">Go Back</p>
            <img src={chevright} className="w-5 ml-4" />
          </div>
        </div>
      );
    
};

export default ResetPassword;