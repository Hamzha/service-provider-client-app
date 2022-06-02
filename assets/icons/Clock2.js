import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      d="M6.571 12.143A5.572 5.572 0 1 0 6.571 1a5.572 5.572 0 0 0 0 11.143Z"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.571 4.428v2.143l2.177 2.537"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
