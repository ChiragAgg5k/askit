import { ModeToggle } from "~/components/appearance-toggle";
import React from "react";
import NavbarURLS from "~/components/navbar-urls";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import SignoutButton from "~/components/signout-button";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";

export default async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <nav
      className={`absolute z-20 flex w-full items-center justify-between border-b px-4 py-3`}
    >
      <Link
        className={`flex items-center justify-center rounded-xl px-4 py-1 text-lg font-bold hover:bg-muted`}
        href={`/`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        <p className={`ml-2`}>Askit</p>
      </Link>
      <div className={`flex items-center space-x-4`}>
        <ul
          className={`flex items-center space-x-4 text-sm text-foreground/70 backdrop-blur transition-all ease-in-out`}
        >
          {session?.user.name ? (
            <>
              <Link
                href={`/profile/${session.user.id}/`}
                className={`rounded-full border transition-all duration-300 ease-in-out hover:border-primary`}
              >
                <Avatar>
                  {session.user.image ? (
                    <AvatarImage src={session.user.image} />
                  ) : (
                    <AvatarFallback className={`hover:border`}>
                      {session.user.name.charAt(0) +
                        session.user.name.charAt(1)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Link>
            </>
          ) : (
            <NavbarURLS />
          )}
        </ul>
        <ModeToggle />
      </div>
    </nav>
  );
}
