import { Ghost } from "lucide-react";

export default function NoData({ message } : { message?: string }) {
  return (
    <div className="w-full h-[50px] flex items-center justify-center">
      <div className="flex gap-2 items-center">
        <Ghost />
        <h5 className="font-semibold">{message}</h5>
      </div>
    </div>
  )
}