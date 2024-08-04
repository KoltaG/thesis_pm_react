import { IconProps } from "../components/common/IconHelper";

const ArrowUp = (props: IconProps) => (
  <svg
    width={props.width || 32}
    height={props.height || 32}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default ArrowUp;
