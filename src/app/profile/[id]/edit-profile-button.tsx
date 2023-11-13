"use client";
import { Button } from "~/components/ui/button";
import React from "react";
import { useToast } from "~/components/ui/use-toast";
import { Toaster } from "~/components/ui/toaster";

export default function EditProfileButton() {
  const toast = useToast();

  return (
    <>
      <Button
        onClick={() => {
          toast.toast({
            title: "Upcoming feature",
            description: "This feature is coming soon!",
          });
        }}
        className={`mt-4 w-full`}
      >
        Edit Profile
      </Button>
      <Toaster />
    </>
  );
}
