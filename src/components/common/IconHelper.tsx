import ArrowUp from "../../icons/ArrowUp";
import Hamburger from "../../icons/Hamburger";

export type IconProps = {
  color?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
};

export type IconType = "hamburger" | "arrowUp";

export type IconHelperProps = {
  icon: IconType;
  iconProps?: IconProps;
};

export default function IconHelper({ icon, iconProps }: IconHelperProps) {
  switch (icon) {
    case "hamburger":
      return <Hamburger {...iconProps} />;
    case "arrowUp":
      return <ArrowUp {...iconProps} />;

    default:
      return null;
  }
}
