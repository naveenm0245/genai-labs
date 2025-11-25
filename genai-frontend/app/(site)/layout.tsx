import React from "react";
import NavBar from "@/components/NavBar/NavBar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <main>{children}</main>
    </div>
  );
}

export default RootLayout;
