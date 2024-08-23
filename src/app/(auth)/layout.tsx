import { Epilogue } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const epilogue = Epilogue({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session !== null) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={epilogue.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
