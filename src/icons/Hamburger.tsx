import { IconProps } from "../components/common/IconHelper";

const Hamburger = (props: IconProps) => (
  <svg
    width={props.width || 22}
    height={props.height || 15}
    viewBox="0 0 22 15"
    fill="none"
    {...props}
  >
    <path
      d="M0.5 0.5H21.5V2.85156H0.5V0.5ZM0.5 8.64844V6.35156H21.5V8.64844H0.5ZM0.5 14.5V12.1484H21.5V14.5H0.5Z"
      fill="currentColor"
    />
  </svg>
);

export default Hamburger;
