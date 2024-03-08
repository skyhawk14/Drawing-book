import { Color } from "@/types/canvas";

interface ColorPickerProps {
  changeColor: (color: Color) => void;
}
const ColorPicker = ({
  changeColor
}: ColorPickerProps) => {
  // create object of colors having id, colorcode and color name and colorColor should be a an object with properties r,g,b
  const colors = [
    { id: 1, colorCode: "#FF0000", colorName: "Red", colorColor: { r: 255, g: 0, b: 0 } },
    { id: 2, colorCode: "#00FF00", colorName: "Green", colorColor: { r: 0, g: 255, b: 0 } },
    { id: 3, colorCode: "#0000FF", colorName: "Blue", colorColor: { r: 0, g: 0, b: 255 } },
    { id: 4, colorCode: "#FFFF00", colorName: "Yellow", colorColor: { r: 255, g: 255, b: 0 } },
    { id: 5, colorCode: "#FF00FF", colorName: "Magenta", colorColor: { r: 255, g: 0, b: 255 } },
    { id: 6, colorCode: "#00FFFF", colorName: "Cyan", colorColor: { r: 0, g: 255, b: 255 } },
    { id: 7, colorCode: "#000000", colorName: "Black", colorColor: { r: 0, g: 0, b: 0 } },
    { id: 8, colorCode: "#FFFFFF", colorName: "White", colorColor: { r: 255, g: 255, b: 255 } },
  ];
 return (
  <>
    <div className="flex flex-wrap w-[170px] justify-around content-around border-2 border-black radius-2"
    >
      {colors.map((color) => (
        <div
          key={color.id}
          className="w-[30px] h-[30px] m-1 cursor-pointer"
          onClick={() => changeColor(color.colorColor)}
          style={{
            backgroundColor: color.colorCode,
            display: "inline-block",
            border: "1px solid #000",
          }}
        />
      ))}
    </div>
  </>
 ) 
}
export default ColorPicker