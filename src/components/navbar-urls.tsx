"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function NavbarURLS() {
  const pathname = usePathname();

  // get last word of pathname
  const path = pathname.split("/").pop();

  return (
    <>
      {path === "signup" ? (
        <Link href={`/auth/signup`} className={`hover:text-foreground`}>
          Signup
        </Link>
      ) : (
        <Link href={`/auth/signin`} className={`hover:text-foreground`}>
          Signin
        </Link>
      )}
    </>
  );
}
