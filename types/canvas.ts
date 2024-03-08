export type Point = {
  x: number;
  y: number;
}

export enum CanvasMode {
  None,
  Inserting,
  Resizing,
  Translating,
  Pressing,
  SelectionNet
}

export type CanvasState = 
  | {
      mode: CanvasMode.None
    } 
  | {
      mode: CanvasMode.Inserting;
      layerType: LayerTypes.Rectangle | LayerTypes.Ellipse;
    }
  | {
      mode: CanvasMode.Translating;
      current: Point;
    }
  | {
      mode: CanvasMode.Resizing;
      corner: Side;
      initialBounds: XYWH;
    }
  | {
      mode: CanvasMode.Pressing;
      current: Point;
      origin: Point;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      current: Point;
    }

export enum LayerTypes {
  Rectangle,
  Ellipse
}

export interface Camera {
  x: number;
  y: number;
}

export type Color = {
  r: number;
  g: number;
  b: number;
}

export type RectangleLayer = {
  type: LayerTypes.Rectangle;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
}

export type EllipseLayer = {
  type: LayerTypes.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
}

/**
 * Represents a layer in a canvas.
 */

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
};

export type XYWH = {  x: number; y: number; width: number; height: number; }

export type Layer = RectangleLayer | EllipseLayer