import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: "success" | "info" | "danger" | "text";
  children: React.ReactNode;
  className?: string;
}

const Button = ({
  onClick,
  disabled = false,
  variant = "info",
  children,
  className,
}: ButtonProps) => {
  const baseStyles = `px-4 py-2 rounded font-semibold transition-colors duration-200 flex items-center gap-2`;
  const disabledStyles = `bg-gray-400 text-white cursor-not-allowed`;
  const variantStyles = {
    success: "bg-green-500 text-white hover:bg-green-600",
    info: "bg-blue-500 text-white hover:bg-blue-600",
    danger:
      "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
    text: "text-black hover:text-gray-600",
  };

  const styles = disabled
    ? `${className} ${baseStyles} ${disabledStyles}`
    : `${className} ${baseStyles} ${variantStyles[variant]}`;

  return (
    <button
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
