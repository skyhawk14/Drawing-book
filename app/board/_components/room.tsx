"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { Layer } from "@/types/canvas";

import { RoomProvider } from "@/liveblocks.config";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";

export function Room({ children }: { children: ReactNode }) {
  return (
    <RoomProvider id="my-room"
      initialPresence={{
        cursor: null,
        selection: [],
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
