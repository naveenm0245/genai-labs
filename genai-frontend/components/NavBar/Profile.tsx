"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "next-auth/react";
import { LogOut, User, ChevronDown, History } from "lucide-react";
import Link from "next/link";

interface User {
  id: string;
  name?: string | undefined;
  email?: string | undefined;
  image?: string | undefined;
}

const Profile = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const getInitials = () => {
    if (user.name) {
      const names = user.name.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-stone-100 transition-colors focus:outline-none focus:ring-0 focus:ring-orange-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.image} />
          <AvatarFallback className="bg-orange-100 text-orange-700 text-xs font-medium">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <div className="hidden md:flex flex-col items-start">
          {/* <p className="text-sm font-medium text-stone-900">{user.name}</p> */}
          {/* <p className="text-xs text-stone-500">{user.email}</p> */}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-stone-200 shadow-lg z-50 overflow-hidden">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.image} />
                <AvatarFallback className="bg-orange-100 text-orange-700 text-sm font-medium">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-medium text-stone-900 truncate">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-stone-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link href="/history" className="w-full flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors">
              <History className="w-4 h-4" />
              <span>History</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
