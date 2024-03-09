"use client";

import { memo } from "react";

import { LayerTypes } from "@/types/canvas";
import { useStorage } from "@/liveblocks.config";

import { Ellipse } from "./ellipse";
import { Rectangle } from "./rectangle";
import { Note } from "./note";
import { Text } from "./text";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selectionColor,
}: LayerPreviewProps) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerTypes.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerTypes.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
      case LayerTypes.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerTypes.Text:
          return (
            <Text
              id={id}
              layer={layer}
              onPointerDown={onLayerPointerDown}
              selectionColor={selectionColor}
            />
          );
    default:
      console.warn("Unknown layer type");
      return null;
  }
});

LayerPreview.displayName = "LayerPreview";