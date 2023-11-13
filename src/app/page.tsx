import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { PageWrapper } from "~/components/page-transition-wrapper";
import AskQuestion from "~/components/ask-question";
import AnimatedTextWord from "~/components/animated-text-word";
import ArrowLink from "~/components/arrow-animation";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <PageWrapper>
      <main className="flex min-h-screen flex-col items-center justify-center space-y-6">
        <div className={`text-center`}>
          <h1 className="mb-2 flex items-center justify-center text-4xl font-bold">
            Askit
          </h1>
          <AnimatedTextWord text={`Got any questions? Just Askit.`} />
        </div>
        <div className={`flex w-full items-center justify-center px-4`}>
          <AskQuestion isSignedIn={session !== null} />
        </div>
        <div className={`flex items-center text-sm`}>
          <p className={`text-muted-foreground`}>
            Just wanna answer questions?{" "}
          </p>
          <ArrowLink />
        </div>
      </main>
    </PageWrapper>
  );
}
