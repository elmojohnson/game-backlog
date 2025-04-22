import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function PageNotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-bold text-5xl">Page not found</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>Go back</Button>
      </div>
    </div>
  );
}
