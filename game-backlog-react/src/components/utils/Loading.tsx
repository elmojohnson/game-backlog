import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <Loader2 className="animate-spin" size={40} />
    </div>
  );
}
