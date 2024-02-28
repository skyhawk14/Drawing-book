import { Circle } from "./types"

const Circle = ({
  cx,
  cy,
  radius,
  stroke,
  strokeWidth,
  fill
}: Circle) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={radius}
      stroke={stroke}
      stroke-width={strokeWidth}
      fill={fill}
    />
  )
}

export default Circle