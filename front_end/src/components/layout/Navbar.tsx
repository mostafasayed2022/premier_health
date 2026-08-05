"use client";

import * as React from "react";
import { NavTopBar } from "./navbar/NavTopBar";
import { NavMainBar } from "./navbar/NavMainBar";
import { NavMobileMenu } from "./navbar/NavMobileMenu";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 flex flex-col shadow-md bg-white">
      <NavTopBar mounted={mounted} />
      <NavMainBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <NavMobileMenu isOpen={isOpen} setIsOpen={setIsOpen} mounted={mounted} />
    </header>
  );
}
