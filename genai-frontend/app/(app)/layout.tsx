import { checkAuth } from "@/lib/auth/utils";
import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import LoggedInNavBar from "@/components/NavBar/LoggedInNavBar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie") || "";

  return (
    <main>
      <NextAuthProvider>
        <TrpcProvider cookies={cookieHeader}>
          <LoggedInNavBar />
          <main>{children}</main>
          <Toaster richColors />
        </TrpcProvider>
      </NextAuthProvider>
    </main>
  );
}
