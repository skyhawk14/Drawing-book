import { useMutation, useSelf } from "@/liveblocks.config";
import { useSelectionBounds } from "./hooks/use-selection-bound";
import { Camera, Color } from "@/types/canvas";
import ColorPicker from "./color-picker";

export default function SelectionTools ({
  camera
}: {
  camera: Camera
}) {
  const selectedLayer = useSelf(self => self.presence.selection[0])
  
  const bounds = useSelectionBounds()
  
  const handleChangeColor = useMutation(
  ({ self, storage, },
    color: Color)=>{
    const liveLayers = storage.get("layers");
    self.presence.selection.forEach((id) => {
      liveLayers.get(id)?.set("fill", color);
    })
  }, [])
  
  if (!bounds) {
    return null;
  }
  console.log('bounds', bounds)

  return (
    <div style={{
      position: 'fixed',
      zIndex: 10,
      transform: `translate(${bounds.x + camera.x - bounds.width/2 + 20}px, ${bounds.y + camera.y - 90}px)`,
    }}>
      <ColorPicker 
        changeColor={handleChangeColor}
      />
    </div>
  )
}