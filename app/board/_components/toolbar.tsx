"use client"
import Rectangle from "@/app/learn/(svg)/rectangle";
import ToolbarButton from "./toolbar-button";
import { 
  Circle, 
  MousePointer2, 
  Pencil, 
  Redo2, 
  Square, 
  StickyNote, 
  Type,
  Undo2
} from "lucide-react";
import { CanvasMode, CanvasState, LayerTypes } from "./canvas";


export interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (v: any)=>void;
}
export default function Toolbar({
  canvasState,
  setCanvasState
}: ToolbarProps) {
  return <div className="bg-red-100 absolute top-2 flex p-2">
    <div className="bg-gray-400 flex border-gray-600 border-2 rounded-lg">
      <ToolbarButton
        onClick={()=>setCanvasState({
          mode: CanvasMode.None
        })}
        selected={canvasState.mode === CanvasMode.None}
        icon={MousePointer2}
      />
      <ToolbarButton
        onClick={()=>setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerTypes.Rectangle
        })}
        selected={
          canvasState.mode === CanvasMode.Inserting
          && canvasState.layerType === LayerTypes.Rectangle
        }
        icon={Square}
      />
      <ToolbarButton
        onClick={()=>setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerTypes.Circle
        })}
        selected={
          canvasState.mode === CanvasMode.Inserting
          && canvasState.layerType === LayerTypes.Circle
        }
        icon={Circle}
      />
    </div>
  </div>;
}
