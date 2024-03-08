"use client"
import { useState, useCallback } from "react";
import Toolbar from "./toolbar";
import { findIntersectingLayersWithRectangle, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { useHistory, useMutation, useOthers, useStorage } from "@/liveblocks.config";
import { LayerTypes, CanvasMode, Point, Layer, EllipseLayer, Color, Side, XYWH } from "@/types/canvas";
import { Camera, CanvasState } from "@/types/canvas";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import SelectionBox from "./selection-box";

export default function Canvas() {
  const layerIds = useStorage((root) => root.layerIds);

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

  console.log(canvasState.mode === CanvasMode.Resizing)
  const resizeSelectedLayer = useMutation((
    { storage, self },
    point: Point,
  ) => {
    console.log('resizeSelectedLayer')
    if (canvasState.mode !== CanvasMode.Resizing) {
      return;
    }
    
    const bounds = resizeBounds(
      canvasState.initialBounds,
      canvasState.corner,
      point,
    );

    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(self.presence.selection[0]);

    if (layer) {
      layer.update(bounds);
    };
  }, [canvasState]);


  const translateSelectedLayers = useMutation((
    { storage, self },
    point: Point,
  ) => {
    if (canvasState.mode !== CanvasMode.Translating) {
      return;
    }

    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y,
    };

    const liveLayers = storage.get("layers");

    for (const id of self.presence.selection) {
      const layer = liveLayers.get(id);

      if (layer) {
        layer.update({
          x: layer.get("x") + offset.x,
          y: layer.get("y") + offset.y,
        });
      }
    }

    setCanvasState({ mode: CanvasMode.Translating, current: point });
  }, 
  [
    canvasState,
  ]);

  const updateSelectionNet = useMutation(({
    storage, setMyPresence
  }, current: Point, origin: Point)=>{
    const layers = storage.get("layers").toImmutable();
    setCanvasState({
      mode: CanvasMode.SelectionNet,
      origin,
      current,
    });

    const ids = findIntersectingLayersWithRectangle(
      layerIds,
      layers,
      origin,
      current,
    );

    setMyPresence({ selection: ids });
  }, [])

  const startMultiSelection = useCallback((
    current: Point,
    origin: Point,
  ) => {
    if (
      Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5
    ) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  const onPointerMoveHandler = useMutation((
    {setMyPresence},
    e: React.PointerEvent
  )=>{
    e.preventDefault();

    const canvasPoint = pointerEventToCanvasPoint(e, camera)
    // console.log(canvasPoint)

    if(canvasState.mode === CanvasMode.Pressing){
      startMultiSelection(canvasPoint, canvasState.origin);
    } else if (canvasState.mode === CanvasMode.SelectionNet) {
      updateSelectionNet(canvasPoint, canvasState.origin);
    } else if(canvasState.mode === CanvasMode.Resizing){
      resizeSelectedLayer(canvasPoint)
    } else if(canvasState.mode === CanvasMode.Translating){
      translateSelectedLayers(canvasPoint)
    }

    setMyPresence({
      cursor: canvasPoint
    })
  }, [camera, canvasState, resizeSelectedLayer])

  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0, 
    b: 0
  })

  const history = useHistory();
  
  const onPointerDownHandler = (e: React.PointerEvent)=>{
    debugger
    const point = pointerEventToCanvasPoint(e, camera)

    if(canvasState.mode === CanvasMode.Inserting){
      return;
    }

    setCanvasState({
      mode: CanvasMode.Pressing,
      current: point,
      origin: point
    })
  }
  const unselectLayers = useMutation((
    { self, setMyPresence }
  ) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const insertLayer = useMutation(({
    setMyPresence, storage
  }, layerType: LayerTypes.Rectangle | LayerTypes.Ellipse, position: Point)=>{
    const liveLayers = storage.get("layers");
    if (liveLayers.size >= 50) {
      return;
    } 

    const liveLayerIds = storage.get("layerIds");
    const layerId = Date.now().toString();
    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100,
      width: 100,
      fill: lastUsedColor
    });
    liveLayerIds.push(layerId);
    
    liveLayers.set(layerId, layer);
    setMyPresence({ selection: [layerId] }, { addToHistory: true });
    setCanvasState({ mode: CanvasMode.None });
  }, [lastUsedColor])

  const onPointerUpHandler = useMutation(({}, e)=>{
    const point = pointerEventToCanvasPoint(e, camera)
    console.log('inserting',CanvasMode.Inserting)
    if (
      canvasState.mode === CanvasMode.None ||
      canvasState.mode === CanvasMode.Pressing
    ) {
      unselectLayers();
      setCanvasState({
        mode: CanvasMode.None,
      });
    } else if(canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== undefined){
      insertLayer(canvasState.layerType, point);
    }
    setCanvasState({
      mode: CanvasMode.None,
    });
  }, [canvasState, unselectLayers])

  const onLayerPointDownHandler = useMutation((
    { self, setMyPresence },
    e: React.PointerEvent,
    layerId: string
  )=>{
    console.log('onLayerPointDownHandler', e, layerId)
    e.stopPropagation()
    if (
      canvasState.mode === CanvasMode.Inserting
    ) {
      return;
    }

    history.pause();
    e.stopPropagation();

    const point = pointerEventToCanvasPoint(e, camera);

    if (!self.presence.selection.includes(layerId)) {
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
    }
    setCanvasState({ mode: CanvasMode.Translating, current: point });
  }, [canvasState.mode])

  const onPointerLeaveHandler = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onResizeHandlePointerDown = useCallback((
    corner: Side,
    initialBounds: XYWH,
  ) => {
    history.pause();
    console.log('onResizeHandlePointerDown')
    setCanvasState({
      mode: CanvasMode.Resizing,
      initialBounds,
      corner,
    });
  }, [history]);

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
      onPointerUp={onPointerUpHandler}
      onPointerLeave={onPointerLeaveHandler}
    >
      <g style={{
        transform: `translate(${camera.x}px,${camera.y}px)`
      }}>
        {
          layerIds.map((id)=>(
            <LayerPreview
              key={id}
              id={id}
              onLayerPointerDown={onLayerPointDownHandler}
              selectionColor="#000"
            />
          ))
        }
        <SelectionBox
          onResizeHandlePointerDown={onResizeHandlePointerDown}
        />
      </g>
    </svg>
  </main>;
}
