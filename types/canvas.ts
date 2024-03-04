
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
