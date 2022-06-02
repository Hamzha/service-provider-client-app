import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      d="M12.077 3.77H1.923A.923.923 0 0 0 1 4.691v6.462c0 .51.413.923.923.923h10.154c.51 0 .923-.413.923-.923V4.692a.923.923 0 0 0-.923-.923ZM1 7.461h12M7 6.539v1.846"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.769 3.77A2.77 2.77 0 0 0 6.999 1v0A2.77 2.77 0 0 0 4.23 3.77"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
