import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  const { size="30px", color="red" } = props
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width={size}
      fill={color}
      height={size}
      stroke={color}
      {...props}
    >
      <Path fill={color} stroke={color} d="M14.984 2.486A1 1 0 0014 3.5V4H8.5a1 1 0 00-1.014 1H6a1 1 0 100 2h18a1 1 0 100-2h-1.486A1 1 0 0021.5 4H16v-.5a1 1 0 00-1.016-1.014zM6 9l1.793 15.234A1.997 1.997 0 009.777 26h10.446a1.998 1.998 0 001.984-1.766L24 9H6z" />
    </Svg>
  )
}

export default SvgComponent
