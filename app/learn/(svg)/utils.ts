import { Circle, layerShapeItem } from "./types"

export function addToLocalStorage(storageName:string, value: layerShapeItem):void {
  const data = window.localStorage.getItem(storageName)
  if(data) {
    const storeData = JSON.parse(data)
    const newData = [...storeData, value]

    window.localStorage.setItem(storageName, JSON.stringify(newData))
  }
}

export function getItemFromLocalStorage(storageName: string) {
  return JSON.parse(window.localStorage.getItem(storageName)||'')
}