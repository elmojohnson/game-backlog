import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "@/components/utils/ThemeProvider";

import ProtectedRoute from "./components/layouts/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner"

// Main
import Root from "./pages/root";
import PageNotFound from "./pages/page-not-found";
import ErrorPage from "./pages/error-page";

// Account
import SignUp from "./pages/account/sign-up";
import SignIn from "./pages/account/sign-in";
import Account from "./pages/account/account";

// Backlogs
import Home from "./pages/home";
import ViewBacklog from "./pages/backlogs/view-backlog";
import BacklogGames from "./pages/backlogs/views/backlog-games";
import BrowseGames from "./pages/backlogs/views/browse-games";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "*", Component: PageNotFound },
  {
    path: "/",
    Component: Root,
    children: [
      // Public routes
      { path: "error", Component: ErrorPage },
      { path: "account/sign-up", Component: SignUp },
      { path: "account/sign-in", Component: SignIn },

      // Protected routes
      {
        path: "/",
        Component: ProtectedRoute,
        children: [
          { index: true, Component: Home },
          { path: "account", Component: Account },
          {
            path: "backlogs/:id",
            Component: ViewBacklog,
            children: [
              { index: true, Component: BacklogGames },
              { path: "browse-games", Component: BrowseGames },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" richColors />
    </QueryClientProvider>
  </ThemeProvider>
);
