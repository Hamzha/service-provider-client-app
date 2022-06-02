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
      d="M1 6.571A5.571 5.571 0 1 0 6.571 1a6.197 6.197 0 0 0-4.285 1.714"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m2.715 1-.429 1.714L4 3.143M6.571 3.572V7L4.343 8.114"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
