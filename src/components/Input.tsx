import React from "react";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  label: string;
  icon: string;
  helperText: string;
  type: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  id,
  value,
  label,
  onChange,
  onBlur,
  icon,
  helperText,
  type,
  placeholder,
}) => {
  return (
    <div className="text-sm mt-5">
      <label htmlFor={label} className="text-gray-600">
        {label}
      </label>
      <div
        className={`w-full h-12 flex border-b ${
          helperText
            ? "border-b-red-600 focus-within:border-b-red-600"
            : "border-b-gray-300"
        } mt-2 focus-within:border-b-gray-500`}
      >
        <input
        id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full h-full text-xs outline-none bg-transparent"
        />
        <img src={icon} className="w-5" />
      </div>
      <p className="text-xs text-red-600 mt-2">{helperText}</p>
    </div>
  );
};

export default Input;
