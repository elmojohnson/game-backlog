import { useState } from "react";
import { Link } from "react-router";
import { appTitle, links } from "@/app-settings";
import { ThemeToggle } from "../utils/ThemeToggle";
import { Button, buttonVariants } from "../ui/button";
import { Gamepad2, Menu } from "lucide-react";


import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function AppDrawer() {
    return (
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon" className="hover:cursor-pointer md:hidden flex">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription className="sr-only">Menu Drawer</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 flex flex-col gap-4">
            {links.map((link) => {
              return (
                <Link key={link.title} to={link.href} className={buttonVariants({ variant: "secondary" })} onClick={() => setOpen(false)}>
                  {link.title}
                </Link>
              );
            })}
            <div className="flex items-center justify-between bg-secondary p-3 rounded-lg">
              <label className="font-semibold text-sm">Theme</label>
              <ThemeToggle />
            </div>
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="bg-white dark:bg-black sticky top-0 z-50 w-full py-3 shadow">
      <div className="wrapper flex justify-between">
        <Link to="/" className="font-bold text-2xl flex items-center gap-2"><Gamepad2 size={40}/>{appTitle}</Link>
        <div className="md:flex hidden items-center gap-4">
          {links.map((link) => {
            return (
              <Link key={link.title} to={link.href}>
                {link.title}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
        <AppDrawer />
      </div>
    </div>
  );
}
