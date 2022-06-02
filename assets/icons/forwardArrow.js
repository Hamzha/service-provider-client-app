import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={8}
      height={14}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.751 7a1.17 1.17 0 01-.39.865L1.786 12.77a.926.926 0 11-1.22-1.385l4.875-4.29a.125.125 0 000-.19L.566 2.615a.925.925 0 111.22-1.385l5.575 4.905a1.17 1.17 0 01.39.865z"
        fill="#BDBDBD"
      />
    </Svg>
  )
}

export default SvgComponent
