import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    const {fill="#FFBA49"}=props
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={11}
      height={10}
      viewBox="0 0 11 10"
      fill="none"
      {...props}
    >
      <Path
        d="M5.5 0l1.778 3.053 3.453.747-2.354 2.635.356 3.515L5.5 8.525 2.267 9.95l.356-3.515L.269 3.8l3.453-.747L5.5 0z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent
