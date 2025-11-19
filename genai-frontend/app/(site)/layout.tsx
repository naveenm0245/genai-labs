import React from "react";
import NavBar from "@/components/NavBar/NavBar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* <div className="relative h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [bg-size:16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div> */}
      <NavBar />
      <main className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}

export default RootLayout;
