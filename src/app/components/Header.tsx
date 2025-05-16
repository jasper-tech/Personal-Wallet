"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const getTitleFromPath = (pathname: string): string => {
  if (pathname === "/") return "Dashboard";
  if (pathname.includes("/send-money")) return "Send Money";
  if (pathname.includes("/transactions")) return "Transactions";

  return "App";
};

export default function Header() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  return (
    <header className="bg-card shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
