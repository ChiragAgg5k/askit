"use client";

import React from "react";
import { api } from "~/trpc/react";
import { Icons } from "~/components/loading-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Link from "next/link";

export default function AnsAuthor({ authorId }: { authorId: string }) {
  const user = api.user.fetch.useQuery({ id: authorId });

  if (user.isLoading || !user.data) {
    return <Icons.spinner className={`mb-4 mt-2 animate-spin md:mb-0`} />;
  }

  return (
    <div className={`mb-4 mt-2 md:mb-0`}>
      {user?.data?.name && (
        <Link href={`/profile/${user.data.id}`}>
          <Avatar>
            {user.data.image ? (
              <AvatarImage src={user.data.image} />
            ) : (
              <AvatarFallback className={`hover:border`}>
                {user.data.name.charAt(0) + user.data.name.charAt(1)}
              </AvatarFallback>
            )}
          </Avatar>
        </Link>
      )}
    </div>
  );
}
