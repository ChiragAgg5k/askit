"use client";

import * as React from "react";

import { cn } from "src/lib/utils";
import { Icons } from "src/components/loading-spinner";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { signIn } from "next-auth/react";
import { api } from "~/trpc/react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { useToast } from "~/components/ui/use-toast";
import { Toaster } from "~/components/ui/toaster";

const salt = bcrypt.genSaltSync(10);

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function UserSignupForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      setIsLoading(false);
      router.push("/auth/signin");
    },
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      await createUser.mutateAsync({ name, email, password: hashedPassword });
    } catch (error) {
      setIsLoading(false);

      toast.toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    }

    toast.toast({
      title: "Success",
      description: "You have successfully created an account, please sign in.",
    });
  }

  const handleProviderSignIn = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
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
            Create account
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
