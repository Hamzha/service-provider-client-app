import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  const {fill="#66666A"}=props
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={9}
      height={6}
      viewBox="0 0 9 6"
      fill="none"
      {...props}
    >
      <Path d="M8.5 0H0l4.5 6 4-6z" fill={fill} />
    </Svg>
  )
}

export default SvgComponent
