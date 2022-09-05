import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  Icon?: React.FC<React.ComponentProps<"svg">>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  children,
  className,
  Icon,
  ...buttonProps
}) => {
  return (
    <button
      className={clsx(
        "duration-100 active:scale-95 inline-flex items-center gap-1",
        className
      )}
      {...buttonProps}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;
