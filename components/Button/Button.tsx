import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button = ({ children, type = "button", ...props }: ButtonProps) => {
  return (
    <button className={styles.button} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
