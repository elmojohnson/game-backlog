import { useSession } from "@/contexts/SessionProvider";
import { Navigate, Outlet } from "react-router";
import Navbar from "./Navbar";

export default function ProtectedRoute() {
  const session = useSession();

  if (!session?.user) {
    return <Navigate to="/account/sign-in" replace />;
  }

  return (
    <div>
      <Navbar />
      <div className="wrapper py-4">
        <Outlet />
      </div>
    </div>
  );
}
