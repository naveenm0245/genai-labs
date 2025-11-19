import { Button } from "../ui/button";
import Link from "next/link";
import NavBarItems from "./NavBarItems";
import { getUserAuth } from "@/lib/auth/utils";
import SignIn from "../auth/SignIn";

const NavBar = async () => {
  const session = await getUserAuth();

  const user = session.session?.user;

  if (user === null) return;

  return (
    <nav className="sticky top-0 z-50 w-full p-4 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between bg-gray-100/80 backdrop-blur-xl rounded-4xl shadow-lg border border-gray-100/20 px-6 py-2">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-emerald-600 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full border border-emerald-600" />
              </div>
              {/* <Image src={logo} alt="LLM Labs" width={32} height={32} className="rounded-full"/> */}
              <span className="text-xl font-semibold text-gray-800 dark:text-gray-800">
                LLM Labs
              </span>
            </Link>
          </div>

          <NavBarItems />
          {/* Dashboard Button */}
          <div className="flex items-center">
            <Button
              variant="default"
              asChild
              className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg transition-all h-10 px-6"
            >
              {user ? (
                <Link href="/dashboard">Dashboard</Link>
              ) : (
                <Link href="/sign-in">Sign In</Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
