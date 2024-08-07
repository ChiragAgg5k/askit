"use client";

import { api } from "~/trpc/react";
import { PageWrapper } from "~/components/page-transition-wrapper";
import { Skeleton } from "src/components/ui/skeleton";
import Link from "next/link";
import { howLongAgo } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import Shepherd from "shepherd.js";

export default function Posts() {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.post.fetchInfinte.useInfiniteQuery(
      {
        limit: 5,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView]);

  const [tourStarted, setTourStarted] = useState(false);

  const tour = new Shepherd.Tour({
    useModalOverlay: true,
  });

  tour.addStep({
    id: "welcome",
    text: "Welcome to the Askit! I see you are new here. Let me guide you through the platform.",
    attachTo: {
      element: ".top-element",
      on: "bottom",
    },
    classes:
      "border w-full max-w-2xl rounded-xl text-sm p-4 mt-6 z-50 bg-background",
    buttons: [
      {
        text: "Skip",
        action: void tour.complete,
        classes:
          "px-4 py-2 mt-4 mr-2 bg-foreground/90 text-background rounded-lg hover:bg-neutral",
      },
      {
        text: "Next",
        action: void tour.next,
        classes:
          "px-4 py-2 mt-4 bg-foreground text-background rounded-lg hover:bg-neutral",
      },
    ],
  });

  return (
    <PageWrapper className={`top-element pt-16`}>
      <div className={`p-6`}>
        <div className={`mb-6 flex items-center justify-between`}>
          <h1 className={`text-xl font-bold`}>Recent Posts</h1>
          <Button
            variant="secondary"
            className={`border text-sm transition-all duration-300 ease-in-out hover:border-primary`}
            disabled={tourStarted}
            onClick={() => {
              void tour.start();
              setTourStarted(true);
            }}
          >
            Need help?
          </Button>
        </div>
        {data ? (
          data.pages.map((page) => (
            <React.Fragment key={page.nextCursor ?? "lastPage"}>
              {page.posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}/`}>
                  <div
                    className={`mb-4 rounded-xl border p-6 transition-all duration-300 ease-in-out hover:cursor-pointer hover:border-primary`}
                  >
                    <div className={`mb-3 flex items-center justify-between`}>
                      <h2 className={`font-bold`}>{post.title}</h2>
                      <p className={`text-end text-sm text-muted-foreground`}>
                        {howLongAgo(post.createdAt)}
                      </p>
                    </div>
                    <p className={`mb-2 line-clamp-3 text-muted-foreground`}>
                      {post.description}
                    </p>

                    <div className={`flex items-center justify-between`}>
                      <div>
                        {post.categories.length > 0 ? (
                          post.categories.map((category, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className={`mr-2 hover:cursor-pointer hover:bg-primary hover:text-white`}
                            >
                              {category}
                            </Badge>
                          ))
                        ) : (
                          <Badge
                            variant="outline"
                            className={`mr-2 hover:cursor-pointer hover:bg-primary hover:text-white`}
                          >
                            Uncategorized
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </React.Fragment>
          ))
        ) : (
          <div className={`space-y-4`}>
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
          </div>
        )}

        {isFetchingNextPage && (
          <div className={`space-y-4`}>
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
          </div>
        )}
      </div>

      {!hasNextPage && (
        <div className={`flex items-center justify-center`}>
          <p className={`pb-8 text-sm text-muted-foreground`}>
            No more posts to show.
          </p>
        </div>
      )}

      <span ref={ref} style={{ visibility: "hidden" }}>
        intersection observer
      </span>
    </PageWrapper>
  );
}
