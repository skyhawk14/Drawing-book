import { useSelf } from "@/liveblocks.config";
import { useSelectionBounds } from "./hooks/use-selection-bound";
import { Side, XYWH } from "@/types/canvas";

const HANDLE_WIDTH = 8;

export default function SelectionBox({
  onResizeHandlePointerDown
}: {
  onResizeHandlePointerDown: (corner: Side, bounds: XYWH) => void;
}) {
  const selectedLayer = useSelf(self => self.presence.selection[0])
  
  // Todo: change logic
  const isShowingHandles = true

  const bounds = useSelectionBounds()

  if (!bounds) {
    return null;
  }
  console.log('bounds')
  
  return (
    <>
      <rect
        className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
        style={{
          transform: `translate(${bounds.x}px, ${bounds.y}px)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles && (
        <>
          <rect
            className="fill-transparent stroke-blue-500 stroke-1"
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )
              `
            }}
            fill="green"
            stroke="red"
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
            }}
          />
          <rect
            className="fill-transparent stroke-blue-500 stroke-1"
            style={{
              cursor: "n-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x + bounds.width / 2 - HANDLE_WIDTH/2}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )
              `
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top, bounds);
            }}
          />
          <rect
            className="fill-transparent stroke-blue-500 stroke-1"
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x + bounds.width - HANDLE_WIDTH/2}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )
              `
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
            }}
          />
          <rect
            className="fill-transparent stroke-blue-500 stroke-1"
            style={{
              cursor: "w-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH/2}px,
                  ${bounds.y + bounds.height/2 - HANDLE_WIDTH / 2}px
                )
              `
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Left, bounds);
            }}
          />
          <rect
            className="fill-transparent stroke-blue-500 stroke-1"
            style={{
              cursor: "e-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x + bounds.width - HANDLE_WIDTH/2}px,
                  ${bounds.y + bounds.height/2 - HANDLE_WIDTH / 2}px
                )
              `
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Right, bounds);
            }}
          />
          <rect
            className="fill-transparent stroke-blue-500 stroke-1"
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH/2}px,
                  ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                )
              `
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
            }}
          />
          <rect
            className="fill-transparent stroke-blue-500 stroke-1"
            style={{
              cursor: "s-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x + bounds.width/2 - HANDLE_WIDTH/2}px,
                  ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                )
              `
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom, bounds);
            }}
          />
          <rect
            className="fill-transparent stroke-blue-500 stroke-1"
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x + bounds.width - HANDLE_WIDTH/2}px,
                  ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                )
              `
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
            }}
          />
        </>
      )}
    </>
  );
}