import { Dispatch, SetStateAction } from "react";

type ButtonProps = {
  children: string;
  onClick?: Dispatch<SetStateAction<boolean>>;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button
    className="btn-toggle"
    onClick={() =>
      onClick
        ? onClick((open) => !open)
        : console.log("button action not implemented")
    }
  >
    {children}
  </button>
);

export default Button;
