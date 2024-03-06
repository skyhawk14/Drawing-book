export type RectangleShape = {
  height: number;
  width: number;
  x: number;
  y: number;
  rx?: number;
  ry?: number;
  stroke: string;
  strokeWidth: string;
  fill: string;
}

export type Circle = {
  cx: number;
  cy: number;
  radius: number;
  stroke: string; // for now treat it a string //later define a Color type
  strokeWidth?: number;
  fill?: string;
}

export interface layerShapeItem {
  type: number;
  element: Circle | RectangleShape
}

export const DRAWING_BOOK_DATA = 'drawing-book-data'

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer