"use client"
import { useState, useCallback } from "react";
import Toolbar from "./toolbar";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { useMutation, useMyPresence, useOthers } from "@/liveblocks.config";

export enum CanvasMode {
  None,
  Inserting,
  Resizing,
  Translating
}

export interface CanvasState {
  mode: CanvasMode.None | CanvasMode.Inserting;
  layerType?: LayerTypes.Rectangle | LayerTypes.Circle
}

export enum LayerTypes {
  Rectangle,
  Circle
}

export interface Camera {
  x: number;
  y: number;
}

export default function Canvas() {
  // keep track of the others users' presence
  const others = useOthers();

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0
  })

  const onwheelHandler = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMoveHandler = useMutation((
    {setMyPresence},
    e: React.PointerEvent
  )=>{
    e.preventDefault();

    const canvasPoint = pointerEventToCanvasPoint(e, camera)
    console.log(canvasPoint)
    setMyPresence({
      cursor: canvasPoint
    })
  }, [camera, canvasState])

  const onPointerDownHandler = ()=>{}

  return <main className="h-full w-full bg-red-100 relative">
    <Toolbar
      canvasState={canvasState}
      setCanvasState={setCanvasState}
    />
    <svg
      className="h-[100vh] w-[100vw]"
      onWheel={onwheelHandler}
      onPointerDown={onPointerDownHandler}
      onPointerMove={onPointerMoveHandler}
    >
      <g style={{
        transform: `translate(${camera.x}px,${camera.y}px)`
      }}>
        <rect width="200" height="100" x="300" y="10" rx="20" ry="20" fill="blue" />
      </g>
    </svg>
  </main>;
}
