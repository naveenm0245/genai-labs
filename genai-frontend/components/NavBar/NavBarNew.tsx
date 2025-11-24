import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const NavBarNew = () => {
  return (
    <div>
      <nav className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/60">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-7 h-7 bg-stone-900 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:bg-orange-600 transition-colors duration-300">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm tracking-tight">
              Model Tuner
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-500">
            <Link href="/playground" className="hover:text-stone-900 transition-colors">
              Playground
            </Link>
            <Link
              href="#features"
              className="hover:text-stone-900 transition-colors"
              scroll={true}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("features");
                if (element) {
                  const offset = 80; // Account for fixed navbar + padding
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Features
            </Link>
            {/* <Link href="#" className="hover:text-stone-900 transition-colors">
              SDK
            </Link> */}
            <Link
              href="#pricing"
              className="hover:text-stone-900 transition-colors"
              scroll={true}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("pricing");
                if (element) {
                  const offset = 80; // Account for fixed navbar + padding
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Pricing
            </Link>
            {/* <Link href="#" className="hover:text-stone-900 transition-colors">
              Changelog
            </Link> */}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-stone-500 hover:text-stone-900 px-3 py-2 transition-colors"
            >
              Log in
            </Link>
            <Button
              asChild
              className="text-sm font-medium bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-full shadow-lg shadow-stone-900/20 transition-all active:scale-95"
            >
              <Link href="/sign-in">Start Tuning</Link>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBarNew;
