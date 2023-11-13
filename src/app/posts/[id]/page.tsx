import { PageWrapper } from "~/components/page-transition-wrapper";
import { api } from "~/trpc/server";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import React from "react";
import PostAnswer from "~/components/ui/post_answer";
import { getServerAuthSession } from "~/server/auth";
import GPTAnswer from "~/components/gpt-answer-generation";
import { Button } from "~/components/ui/button";
import AnsAuthor from "~/app/posts/[id]/ans-author";
import { BsStars } from "react-icons/bs";
import Markdown from "react-markdown";
import { howLongAgo } from "~/lib/utils";

export default async function PostPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const post = await api.post.fetch.query({ id: params.id });
  const allAnswers = await api.ans.fetch.query({ id: params.id });
  const session = await getServerAuthSession();

  if (!post) {
    return (
      <PageWrapper className={`flex min-h-screen items-center justify-center`}>
        <div>
          <h1 className={`mb-2 text-center text-2xl font-bold`}>
            Post not found
          </h1>
          <p>
            Maybe the id is wrong? 🤔
            <Link href={`/posts/`} className={`ml-4 underline`}>
              Go back
            </Link>
          </p>
        </div>
      </PageWrapper>
    );
  }

  const user = await api.user.fetch.query({ id: post.authorId ?? "" });

  return (
    <>
      <PageWrapper className={`pt-16`}>
        <div className={`p-10`}>
          <div className={`flex`}>
            {user?.name && (
              <div className={`px-6  pt-2`}>
                <Link href={`/profile/${user.id}`}>
                  <Avatar>
                    {user.image ? (
                      <AvatarImage src={user.image} />
                    ) : (
                      <AvatarFallback className={`hover:border`}>
                        {user.name.charAt(0) + user.name.charAt(1)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Link>
              </div>
            )}
            <div>
              <h1 className={`mb-6 text-2xl font-bold`}>{post.title}</h1>
              <p className={"whitespace-pre-line"}>{post.description}</p>
            </div>
          </div>
          {session && session.user ? (
            <GPTAnswer
              question={post.title}
              description={post.description}
              answeredPosts={
                allAnswers ? allAnswers.map((answer) => answer.description) : []
              }
            />
          ) : (
            <div className={`mt-4 flex flex-col items-center justify-end`}>
              <Button disabled>
                Sign in to Analyze with AI
                <BsStars className={`ml-2`} />
              </Button>
            </div>
          )}
          <hr className={`my-6`} />
          <PostAnswer isSignedIn={session !== null} postId={params.id} />
          {allAnswers && allAnswers.length === 0 ? (
            <div className={`flex min-h-[30dvh] items-center justify-center`}>
              <p className={`text-center text-sm text-muted-foreground`}>
                No answers yet. Be the first to answer!
              </p>
            </div>
          ) : (
            <></>
          )}
          {allAnswers && allAnswers.length > 0
            ? allAnswers.map((answer) => (
                <>
                  <div
                    key={answer.id}
                    className={`mb-2 mt-6 flex items-center justify-start`}
                  >
                    {answer.authorId !== null && (
                      <AnsAuthor authorId={answer.authorId} />
                    )}
                    <Markdown
                      className={`ml-4 text-base text-muted-foreground`}
                    >
                      {answer.description}
                    </Markdown>
                  </div>
                  <p
                    className={`whitespace-nowrap px-2 text-end text-sm text-muted-foreground`}
                  >
                    {howLongAgo(answer.createdAt)}
                  </p>
                  <hr className={`my-6`} />
                </>
              ))
            : null}
        </div>
      </PageWrapper>
      <Link
        href={`/posts/`}
        className={`fixed bottom-0 p-4 text-sm text-muted-foreground`}
      >
        <Button variant={`secondary`}>Back to all posts</Button>
      </Link>
    </>
  );
}
