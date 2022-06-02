import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={37}
      height={33}
      viewBox="0 0 37 33"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.5 28.875a3.376 3.376 0 01-3.375 3.375H3.875A3.376 3.376 0 01.5 28.875V8.625A3.376 3.376 0 013.875 5.25h6.188l.865-2.313A3.37 3.37 0 0114.084.75h8.824a3.37 3.37 0 013.157 2.187l.872 2.313h6.188A3.376 3.376 0 0136.5 8.625v20.25zM26.938 18.75a8.438 8.438 0 10-16.876 0 8.438 8.438 0 0016.876 0zm-6.07 5.718a6.188 6.188 0 003.82-5.718 6.2 6.2 0 00-6.188-6.187 6.188 6.188 0 102.369 11.905z"
        fill="#8A8D9F"
      />
    </Svg>
  )
}

export default SvgComponent
