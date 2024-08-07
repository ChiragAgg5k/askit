"use client";

import { Button } from "~/components/ui/button";
import { BsStars } from "react-icons/bs";
import React from "react";
import { api } from "~/trpc/react";
import { Icons } from "~/components/loading-spinner";
import { Toaster } from "~/components/ui/toaster";
import Markdown from "react-markdown";

export default function GPTAnswer({
  question,
  description,
  answeredPosts,
}: {
  question: string;
  description: string;
  answeredPosts: string[];
}) {
  const [prompt, setPrompt] = React.useState<string>("");
  const gptResponse = api.gpt.create.useQuery({
    prompt: prompt,
  });

  const handleClick = () => {
    let prompt =
      "Question: " + question + "\n\n" + "Description: " + description + "\n\n";
    if (answeredPosts.length > 0) {
      prompt +=
        "Here are some of the answers given by other users: \n\n" +
        answeredPosts.join("\n") +
        "\n\n";
      prompt +=
        "You need to take these answers into account when writing your answer. \n\n";
      prompt +=
        "Highlight points taken from these answers in your answer by using the **bold** or *italic* markdown syntax. \n\n";
    }

    prompt +=
      "The answer must be concise and to the point. Try to split it into points if possible. \n\n";
    prompt +=
      "The answer should be in markdown format, and must highlight the important points using the **bold** or *italic* markdown syntax. \n\n";

    setPrompt(prompt);
  };

  return (
    <div className={`mt-4 flex flex-col items-center justify-end`}>
      <Button
        onClick={handleClick}
        disabled={gptResponse.isLoading}
        className={`group`}
      >
        {answeredPosts.length > 0 ? "Analyze with AI" : "Answer with AI"}
        {gptResponse.isLoading ? (
          <Icons.spinner className={`ml-2 animate-spin`} />
        ) : (
          <BsStars
            className={`ml-2 transition-all ease-in-out group-hover:scale-125`}
          />
        )}
      </Button>
      {gptResponse.data && (
        <div className={`my-8 rounded-xl bg-muted p-4`}>
          <p className={`text-sm text-muted-foreground`}>
            <Markdown>{gptResponse.data.text}</Markdown>
          </p>
        </div>
      )}

      <Toaster />
    </div>
  );
}
