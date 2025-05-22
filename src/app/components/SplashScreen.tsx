"use client";

import { useState, useEffect } from "react";
import { Wallet, TrendingUp, DollarSign } from "lucide-react";

export default function SplashScreen() {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Animation phases
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);
    const timer2 = setTimeout(() => setAnimationPhase(2), 1000);
    const timer3 = setTimeout(() => setAnimationPhase(3), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Icons */}
        <div
          className={`absolute top-20 left-20 transform transition-all duration-1000 ${
            animationPhase >= 1
              ? "translate-x-0 opacity-30"
              : "-translate-x-full opacity-0"
          }`}
        >
          <DollarSign className="w-8 h-8 text-green-500/30" />
        </div>

        <div
          className={`absolute top-32 right-32 transform transition-all duration-1000 delay-300 ${
            animationPhase >= 1
              ? "translate-x-0 opacity-30"
              : "translate-x-full opacity-0"
          }`}
        >
          <TrendingUp className="w-6 h-6 text-blue-500/30" />
        </div>

        <div
          className={`absolute bottom-32 left-32 transform transition-all duration-1000 delay-500 ${
            animationPhase >= 1
              ? "translate-y-0 opacity-30"
              : "translate-y-full opacity-0"
          }`}
        >
          <Wallet className="w-7 h-7 text-purple-500/30" />
        </div>

        <div
          className={`absolute bottom-20 right-20 transform transition-all duration-1000 delay-700 ${
            animationPhase >= 1
              ? "translate-y-0 opacity-30"
              : "translate-y-full opacity-0"
          }`}
        >
          <DollarSign className="w-5 h-5 text-emerald-500/30" />
        </div>

        {/* Animated Circles */}
        <div
          className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform transition-all duration-2000 ${
            animationPhase >= 2 ? "scale-100 opacity-50" : "scale-0 opacity-0"
          }`}
        ></div>

        <div
          className={`absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 transform transition-all duration-2000 delay-300 ${
            animationPhase >= 2 ? "scale-100 opacity-50" : "scale-0 opacity-0"
          }`}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-8">
        {/* Logo/Icon */}
        <div
          className={`mb-8 transform transition-all duration-1000 ${
            animationPhase >= 0
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-50 opacity-0 translate-y-8"
          }`}
        >
          <div className="relative inline-block">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
              <Wallet className="w-10 h-10 " />
            </div>
            {/* Pulse Animation */}
            <div
              className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 animate-ping ${
                animationPhase >= 1 ? "opacity-20" : "opacity-0"
              }`}
            ></div>
          </div>
        </div>

        {/* Title */}
        <div
          className={`mb-4 transform transition-all duration-1000 delay-300 ${
            animationPhase >= 0
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Personal Finance
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Wallet
          </h2>
        </div>

        {/* Description */}
        {/* <div
          className={`mb-8 transform transition-all duration-1000 delay-500 ${
            animationPhase >= 1
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Manage your finances with ease
          </p>
        </div> */}

        {/* Loading Indicator */}
        <div
          className={`transform transition-all duration-1000 delay-700 ${
            animationPhase >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
          </div>
          <p className="text-sm text-muted-foreground">
            Loading your dashboard...
          </p>
        </div>

        {/* Progress Bar */}
        <div
          className={`mt-8 max-w-xs mx-auto transform transition-all duration-1000 delay-1000 ${
            animationPhase >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-2000 ease-out ${
                animationPhase >= 3 ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Sparkle Effects */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          animationPhase >= 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-100"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white rounded-full animate-ping delay-1000"></div>
      </div>
    </div>
  );
}
