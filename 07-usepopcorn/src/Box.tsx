import { useState } from "react";
import Button from "./Button";

interface BoxProps {
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button onClick={setIsOpen} children={isOpen ? "–" : "+"} />
      {isOpen && children}
    </div>
  );
};
export default Box;
