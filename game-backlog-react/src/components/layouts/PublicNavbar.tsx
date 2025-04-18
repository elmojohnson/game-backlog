import { Link } from "react-router";
import { ThemeToggle } from "../utils/ThemeToggle";

export default function PublicNavbar() {
  return (
    <div className="absolute bg-white dark:bg-black top-0 right-0 w-full py-3 shadow">
      <div className="wrapper flex justify-between">
        <h1 className="font-bold text-2xl">Game Backlog</h1>
        <div className="flex items-center gap-4">
          <Link to="/account/sign-in">Sign in</Link>
          <Link to="/account/sign-up">Sign up</Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
