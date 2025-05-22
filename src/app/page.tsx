"use client";

import { useState, useEffect } from "react";
import Dashboard from "./Dashboard/page";
import Header from "./components/Header";
import SplashScreen from "./components/SplashScreen";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Dashboard />
      </main>
    </div>
  );
}
