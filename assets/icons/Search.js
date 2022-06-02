import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={22}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      clipRule="evenodd"
      d="M18.556 9c0 4.418-3.756 8-8.389 8-4.632 0-8.388-3.582-8.389-8 0-4.418 3.755-8 8.388-8 2.225 0 4.36.843 5.933 2.343 1.573 1.5 2.457 3.535 2.457 5.657Z"
      stroke="#343434"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m20.653 19-4.561-4.35"
      stroke="#343434"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
