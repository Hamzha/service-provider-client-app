import * as React from "react"
import Svg, { Mask, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={23}
      viewBox="0 0 19 23"
      fill="none"
      {...props}
    >
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={19}
        height={23}
        fill="#000"
      >
        <Path fill="#fff" d="M0 0H19V23H0z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.4 1a1.68 1.68 0 00-1.68 1.68v.212A6.723 6.723 0 002.68 9.4v5.88h13.44V9.4a6.723 6.723 0 00-5.04-6.508V2.68A1.68 1.68 0 009.4 1zM6.88 19.48a2.52 2.52 0 105.04 0H6.88zM3 15.28a2 2 0 00-2 2v.36a1 1 0 001 1h14.8a1 1 0 001-1v-.36a2 2 0 00-2-2H3z"
        />
      </Mask>
      <Path
        d="M7.72 2.892l.249.968.75-.193v-.775h-1zM2.68 15.28h-1v1h1v-1zm13.44 0v1h1v-1h-1zM11.08 2.892h-1v.775l.75.193.25-.968zM6.88 19.48v-1h-1v1h1zm5.04 0h1v-1h-1v1zm-3.2-16.8A.68.68 0 019.4 2V0a2.68 2.68 0 00-2.68 2.68h2zm0 .212V2.68h-2v.212h2zM3.68 9.4a5.723 5.723 0 014.289-5.54L7.47 1.923A7.723 7.723 0 001.68 9.4h2zm0 5.88V9.4h-2v5.88h2zm12.44-1H2.68v2h13.44v-2zm-1-4.88v5.88h2V9.4h-2zm-4.29-5.54a5.723 5.723 0 014.29 5.54h2a7.723 7.723 0 00-5.791-7.477l-.498 1.937zm-.75-1.18v.212h2V2.68h-2zM9.4 2a.68.68 0 01.68.68h2C12.08 1.2 10.88 0 9.4 0v2zm0 19c-.84 0-1.52-.68-1.52-1.52h-2A3.52 3.52 0 009.4 23v-2zm1.52-1.52c0 .84-.68 1.52-1.52 1.52v2a3.52 3.52 0 003.52-3.52h-2zm-4.04 1h5.04v-2H6.88v2zM2 17.28a1 1 0 011-1v-2a3 3 0 00-3 3h2zm0 .36v-.36H0v.36h2zm0 0H0a2 2 0 002 2v-2zm14.8 0H2v2h14.8v-2zm0 0v2a2 2 0 002-2h-2zm0-.36v.36h2v-.36h-2zm-1-1a1 1 0 011 1h2a3 3 0 00-3-3v2zm-12.8 0h12.8v-2H3v2z"
        fill="#88888A"
        mask="url(#a)"
      />
    </Svg>
  )
}

export default SvgComponent
