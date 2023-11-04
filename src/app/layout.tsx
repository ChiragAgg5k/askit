import "~/styles/globals.css";

import { headers } from "next/headers";
import { GeistSans } from 'geist/font'
import { TRPCReactProvider } from "~/trpc/react";
import {ThemeProvider} from "~/components/theme-provider";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
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
          {children}
          </ThemeProvider>
          </TRPCReactProvider>
      </body>
    </html>
  );
}
