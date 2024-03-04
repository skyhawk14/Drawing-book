"use client"
import { LucideIcon } from "lucide-react"

interface ToolbarButtonProps {
  icon: LucideIcon;
  selected: boolean;
  onClick: ()=>void;
}
const ToolbarButton = ({
  icon: Icon,
  selected,
  onClick
}: ToolbarButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`shadow-sm text-white cursor-pointer hover:bg-cyan-400 p-2 m-2 hover:rounded-lg ${selected ? 'bg-cyan-600 rounded-lg' : ''}`}>
      <Icon/>
    </div>
  )
}

export default ToolbarButton