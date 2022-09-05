import clsx from "clsx";
import React from "react";

type Props = {
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ label, className, name, ...inputProps }) => {
  return (
    <div className="w-full grid gap-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-left text-base font-medium text-gray-200 tracking-wide"
        >
          {label} {inputProps.required && "*"}
        </label>
      )}

      <input
        name={name}
        {...inputProps}
        className={clsx(
          "block px-3 py-1 text-black placeholder-gray-400 rounded-md appearance-none focus:outline-none text-lg",
          className
        )}
      />
    </div>
  );
};

export default Input;
