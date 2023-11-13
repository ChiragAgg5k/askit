"use client";

import { api } from "~/trpc/react";
import { PageWrapper } from "~/components/page-transition-wrapper";
import { Skeleton } from "src/components/ui/skeleton";
import Link from "next/link";
import { howLongAgo } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

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

  return (
    <PageWrapper className={`pt-16`}>
      <div className={`p-6`}>
        <div className={`mb-6 flex items-center justify-between`}>
          <h1 className={`text-xl font-bold`}>Recent Posts</h1>
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

                    <div className={``}>
                      {post.categories.length > 0 ? (
                        post.categories.map((category, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={`mr-2`}
                          >
                            {category}
                          </Badge>
                        ))
                      ) : (
                        <></>
                      )}
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
