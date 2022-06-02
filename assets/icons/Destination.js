import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={17}
      height={21}
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.983 20.863a.48.48 0 00.673 0c.08-.077 7.983-7.713 7.983-12.364a8.616 8.616 0 00-.656-3.306 8.493 8.493 0 00-1.784-2.7A8.293 8.293 0 0011.556.67a8.148 8.148 0 00-6.473 0A8.294 8.294 0 002.44 2.493a8.494 8.494 0 00-1.784 2.7A8.615 8.615 0 000 8.5c0 4.651 7.903 12.286 7.983 12.363zM5.501 6.808A3 3 0 018.319 5a2.972 2.972 0 012.936 2.998 3 3 0 11-5.754-1.19z"
        fill="#469CD3"
      />
    </Svg>
  )
}

export default SvgComponent
