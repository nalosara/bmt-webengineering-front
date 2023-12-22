import { ReactNode } from "react";
import { Colors } from "../../constants";

type ButtonProps = {
    children: ReactNode;
    color?: Colors;
    onClick: (event: MouseEvent) => void;
  };

const Button = ({ color, children, ...rest }: ButtonProps) => {
    return (
        <button
          className={"btn btn-" + color}
        >
          {children}
        </button>
      );
}

export default Button