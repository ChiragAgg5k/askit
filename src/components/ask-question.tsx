"use client";

import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import { Separator } from "src/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AskQuestion({ isSignedIn }: { isSignedIn: boolean }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const [textareaRows, setTextareaRows] = useState<number>(1);
  const createQuestion = api.post.create.useMutation({
    onSuccess: () => {
      setIsLoading(false);
    },
  });
  const router = useRouter();

  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [question, setQuestion] = useState<string>("");
  const { data: searchResultsData } = api.post.search.useQuery({
    question: question,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (searchResultsData && searchResultsData.length > 0) {
      setIsLoading(false);
      toast.toast({
        title: "Error",
        description: "This question has already been asked",
      });
      return;
    }

    if (question.length == 0) {
      setIsLoading(false);
      toast.toast({
        title: "Error",
        description: "Please enter a question",
      });
      return;
    }

    const target = event.target as typeof event.target & {
      description: { value: string };
    };
    const description = target.description.value;

    target.description.value = "";

    if (description.length == 0) {
      setIsLoading(false);
      toast.toast({
        title: "Error",
        description: "Please enter a description",
      });
      return;
    }

    try {
      const res = await createQuestion.mutateAsync({
        question: question,
        description: description,
        categories: selectedCategories,
      });
      toast.toast({
        title: "Success",
        description: "Your question has been submitted",
      });

      router.push(`/posts/${res.id}`);
    } catch (error) {
      toast.toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className={`relative w-full max-w-2xl`}>
      <Textarea
        rows={textareaRows}
        className={`w-full p-4 pr-20`}
        disabled={isLoading}
        name={`question`}
        onChange={(event) => {
          if (event.target.value.length == 0) {
            return;
          }
          setQuestion(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            setTextareaRows(textareaRows + 1);
            return;
          }
        }}
        id={`question`}
        placeholder="Start typing your query..."
      />

      <Dialog>
        <DialogTrigger
          className={`absolute right-4 top-3`}
          disabled={
            !isSignedIn ||
            question.length == 0 ||
            (searchResultsData && searchResultsData.length > 0)
          }
          asChild
        >
          <Button>Ask</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={`mb-2`}>Post your question</DialogTitle>
            <DialogDescription>
              Post your question in a way that is easy to understand. Provide as
              much detail as possible.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <Input
              className={`w-full`}
              placeholder={`Title of your question`}
              value={question}
            />
            <Textarea
              className={`mt-2 w-full`}
              rows={4}
              id={`description`}
              name={`description`}
              placeholder={`Description of your question`}
            />

            {selectedCategories.length > 0 ? (
              <div className={`my-4 rounded-xl border p-4`}>
                <p className={`text-sm font-bold`}>Selected Categories:</p>
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    className={`text-sm text-muted-foreground`}
                  >
                    {category},
                  </div>
                ))}
              </div>
            ) : null}

            <div className={`mt-4 flex items-center`}>
              <Input
                placeholder={`Category`}
                className={`w-full`}
                onChange={(event) => {
                  setCurrentCategory(event.target.value);
                }}
                value={currentCategory}
              />

              <Button
                type={`button`}
                className={``}
                variant={`outline`}
                onClick={() => {
                  if (currentCategory.length == 0) {
                    return;
                  }
                  setSelectedCategories([
                    ...selectedCategories,
                    currentCategory,
                  ]);
                  setCurrentCategory("");
                }}
              >
                Add
              </Button>
            </div>

            <Button
              type={`submit`}
              className={`mt-4 w-full`}
              variant={`outline`}
            >
              Post
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {searchResultsData && question.length > 1 ? (
        <div className={`absolute w-full w-full bg-background`}>
          <div className="h-72 w-full overflow-x-scroll rounded-md border">
            <div className="pt-2">
              {searchResultsData.map((result, index) => (
                <Link href={`/posts/${result.id}`} key={index}>
                  <Button
                    variant={`ghost`}
                    className="overflow-x-scroll text-sm font-normal"
                  >
                    <p className={`overflow-ellipsis`}>{result.title}</p>
                  </Button>
                  <Separator className="my-2 w-full" />
                </Link>
              ))}

              {searchResultsData.length == 0 ? (
                <div className="text-sm">No results found</div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}
