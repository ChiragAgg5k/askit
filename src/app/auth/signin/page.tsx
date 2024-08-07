import { type Metadata } from "next";
import Link from "next/link";
import { UserSigninForm } from "~/components/user-signin-form";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { PageWrapper } from "~/components/page-transition-wrapper";

export const metadata: Metadata = {
  title: "Askit - Signin",
  description: "Signin to Askit",
};

export default function AuthenticationPage() {
  return (
    <div className="container relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative z-30 hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link
            href={"/"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex items-center text-lg",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Askit
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This website has saved me countless hours of time and
              energy by providing accurate answers on all of my query, even
              better than Google!. &rdquo;
            </p>
            <footer className="text-sm"> - Most of our users...</footer>
          </blockquote>
        </div>
      </div>
      <PageWrapper className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Signin to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to signin
            </p>
          </div>
          <UserSigninForm />
        </div>
      </PageWrapper>
    </div>
  );
}
