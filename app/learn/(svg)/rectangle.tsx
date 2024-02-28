import { RectangleShape } from "./types"

const Rectangle = ({
  height,
  width,
  x,
  y,
  rx=0,
  ry=0,
  stroke,
  strokeWidth,
  fill
}: RectangleShape) => {
  return (
    <rect
      height={height}
      width={width}
      x={x}
      y={y}
      rx={rx}
      ry={ry}
      stroke={stroke}
      stroke-width={strokeWidth}
      fill={fill}
    />
  )
}

export default Rectangle