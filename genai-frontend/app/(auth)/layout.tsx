import NavBarNew from "@/components/NavBar/NavBarNew";
import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserAuth();
  if (session?.session) redirect("/dashboard");

  return (
    <div className="bg-muted h-screen">
      {/* <NavBarNew /> */}
      {children}
    </div>
  );
}
