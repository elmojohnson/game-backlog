import SessionProvider from "@/contexts/SessionProvider";
import { Outlet } from "react-router";

export default function Root() {
  return (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  );
}
