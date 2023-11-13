"use client";
import Markdown from "react-markdown";
import React, { useState } from "react";

export default function Answer({ answer }: { answer: string }) {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div>
      <Markdown
        className={`ml-4 text-base text-muted-foreground ${
          showMore ? "" : "line-clamp-6"
        }`}
      >
        {answer}
      </Markdown>
      <p
        className={`ml-4 mt-4 cursor-pointer text-sm text-muted-foreground hover:underline`}
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show less" : "Show more"}
      </p>
    </div>
  );
}
