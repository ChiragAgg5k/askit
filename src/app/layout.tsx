import "~/styles/globals.css";

import { headers } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import NavBar from "~/components/navbar";
import NextTopLoader from "nextjs-toploader";
import React from "react";

export const metadata = {
  title: "Askit",
  description:
    "- Ask questions, get answers. Askit is a Q&A platform leveraging the power of AI to help you find accurate answers to your questions.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <TRPCReactProvider headers={headers()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader showSpinner={false} color={"#808080"} />
            <NavBar />
            <main>{children}</main>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
