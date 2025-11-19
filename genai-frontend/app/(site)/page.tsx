import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white z-0">
        <div
          className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]"
          style={{
            maskImage:
              "radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)",
          }}
        ></div>
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-8 -translate-y-24">
          <div className="flex items-center gap-2 bg-white/90 border border-gray-200 rounded-full px-4 py-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-gray-900">
              Join 1,500+ content creators & companies
            </span>
          </div>
        </div>
        {/* <h1 className="text-6xl font-bold text-rose-600">LLM Lab</h1> */}
        <h1 className="text-5xl font-semibold text-gray-900 max-w-2xl text-center leading-tight tracking-tight -translate-y-24">
          <span className="text-emerald-600 text-6xl">Generate</span>
          {". "}
          <span className="text-emerald-600 text-6xl">Analyze</span>
          {". "}
          <span className="text-emerald-600 text-6xl">Compare</span>
          {". "}
          <br />
          The fastest way to tune LLM prompts & parameters.{" "}
        </h1>
        <Button
          variant="default"
          className="mt-0 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all h-10 px-6"
        >
          Get Started
        </Button>
        <h1 className="text-sm text-gray-500 mt-4">
          Start 7 Day Free Trial. Cancel Anytime.
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
