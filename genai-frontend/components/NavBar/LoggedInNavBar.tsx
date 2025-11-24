import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserAuth } from "@/lib/auth/utils";

const LoggedInNavBar = async () => {
  const { session } = await getUserAuth();
  if (session?.user === undefined || session?.user === null) return null;
  const user = session.user;
  return (
    <div className="sticky top-0 z-50 w-full p-4 flex items-center justify-center m-2">
      <nav className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/60">
        <div className="max-w-8xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
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
          </div>

          <div className="flex items-center justify-center gap-8">
            <Link
              href="/history"
              className="text-sm font-medium text-stone-500 hover:text-orange-600 px-3 py-2 transition-colors"
            >
              History
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LoggedInNavBar;
