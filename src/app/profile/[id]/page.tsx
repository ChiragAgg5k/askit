import { PageWrapper } from "~/components/page-transition-wrapper";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import React from "react";
import { Button } from "~/components/ui/button";
import SignoutButton from "~/components/signout-button";
import ContactButton from "~/app/profile/[id]/contact-button";
import EditProfileButton from "~/app/profile/[id]/edit-profile-button";

export default async function ProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();
  const user = await api.user.fetch.query({ id: id });

  if (user === null || user === undefined) {
    return (
      <PageWrapper
        className={`flex min-h-screen items-center justify-center pt-16`}
      >
        <h1>Profile not found...</h1>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      className={`flex min-h-screen items-center justify-center pt-16`}
    >
      <div className={`rounded-xl border p-8`}>
        <div className={`flex items-center justify-between`}>
          <div className={`mr-8`}>
            <p className={`mb-2`}>
              <span className={`font-bold`}>Name: </span> {user.name}
            </p>
            <p className={`mb-2`}>
              <span className={`font-bold`}>Email: </span> {user.email}
            </p>
          </div>
          <div>
            <Avatar className={`h-16 w-16`}>
              {user.image ? (
                <AvatarImage src={user.image} />
              ) : (
                <AvatarFallback>
                  {user.name && user.name.charAt(0) + user.name.charAt(1)}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
        {session?.user.id === id ? (
          <EditProfileButton />
        ) : (
          <ContactButton email={user.email} />
        )}
        {session?.user.id === id ? (
          <SignoutButton className={`mt-4 w-full`} />
        ) : (
          <></>
        )}
      </div>
    </PageWrapper>
  );
}
