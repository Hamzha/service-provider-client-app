import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={16}
      viewBox="0 0 18 16"
      fill="none"
      {...props}
    >
      <Path
        d="M16.5 8h-15M8.5 15l-7-7 7-7"
        stroke="#001334"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
