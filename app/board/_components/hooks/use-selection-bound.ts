import { useSelf, useStorage } from "@/liveblocks.config";
import { Layer, XYWH } from "@/types/canvas";
import { shallow } from "@liveblocks/client";

function boundingBox(layers: Layer[]): XYWH | null {
  const firstLayer = layers[0];

  if (!firstLayer) {
    return null;
  }

  let left = firstLayer.x;
  let right = firstLayer.x + firstLayer.width;
  let top = firstLayer.y;
  let bottom = firstLayer.y + firstLayer.height;

  for (let i = 1; i < layers.length; i++) {
    const { x, y, width, height } = layers[i];
    const newLeft = x
    const newRight = x + width
    const newTop = y
    const newBottom = y + height

    if (left > newLeft) {
      left = newLeft;
    }

    if (right < newRight) {
      right = newRight;
    }

    if (top > newTop) {
      top = newTop;
    }

    if (bottom < newBottom) {
      bottom = newBottom;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
}

export const useSelectionBounds = () => {
  const selection = useSelf(self => self.presence.selection);
  
  return useStorage((root) => {
    const selectedLayers = selection
      .map((layerId) => root.layers.get(layerId)!)
      .filter(Boolean);

    return boundingBox(selectedLayers);
  }, shallow);
}