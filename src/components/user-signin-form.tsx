"use client";

import * as React from "react";
import { useEffect } from "react";

import { cn } from "src/lib/utils";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Toaster } from "src/components/ui/toaster";
import { useToast } from "src/components/ui/use-toast";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { Icons } from "src/components/loading-spinner";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function UserSigninForm({ className, ...props }: UserAuthFormProps) {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  let displayError = "Something went wrong, please try again.";
  if (error === "CredentialsSignin") {
    displayError = "Invalid email or password, please try again.";
  } else if (error === "Password does not match") {
    displayError = "Invalid password entered, please try again.";
  } else if (error === "OAuthAccountNotLinked") {
    displayError =
      "This email is already registered with another provider, please try again.";
  }
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast.toast({
        title: "Error",
        description: displayError,
      });
    }
  }, [error]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setIsLoading(false);
  }

  const handleProviderSignIn = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          await handleProviderSignIn("google");
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <AiFillGoogleCircle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          await handleProviderSignIn("github");
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <AiFillGithub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>

      <Toaster />
    </div>
  );
}
