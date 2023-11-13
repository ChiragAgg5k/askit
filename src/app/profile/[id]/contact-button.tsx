"use client";
import { Button } from "~/components/ui/button";
import React from "react";

export default function ContactButton({ email }: { email?: string | null }) {
  const [buttonText, setButtonText] = React.useState("Copy Email");
  return (
    <Button
      className={`mt-4 w-full`}
      onClick={async () => {
        await navigator.clipboard.writeText(`mailto:${email}`);
        setButtonText("Email Copied!");
        setTimeout(() => {
          setButtonText("Contact User");
        }, 2000);
      }}
    >
      {buttonText}
    </Button>
  );
}
