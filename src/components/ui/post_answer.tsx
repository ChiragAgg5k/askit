"use client";

import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";

export default function PostAnswer({
  isSignedIn,
  postId,
}: {
  isSignedIn: boolean;
  postId: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const [textareaRows, setTextareaRows] = useState<number>(1);
  const postAnswer = api.ans.create.useMutation({
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSignedIn) {
      toast.toast({
        title: "Error",
        description: "You need to be signed in to add an answer",
      });
      return;
    }
    setIsLoading(true);

    if (answer.length == 0) {
      setIsLoading(false);
      toast.toast({
        title: "Error",
        description: "Please enter some text..",
      });
      return;
    }

    try {
      await postAnswer.mutateAsync({
        answer: answer,
        postID: postId,
      });
      toast.toast({
        title: "Success",
        description: "Your answer has been submitted",
      });
    } catch (error) {
      toast.toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }

    setIsLoading(false);
    setAnswer("");

    window.location.reload();
  };

  return (
    <div className={`relative mb-4 w-full`}>
      <form onSubmit={handleSubmit}>
        <Textarea
          rows={textareaRows}
          className={`relative h-10 w-full p-4 pr-20`}
          disabled={isLoading}
          name={`question`}
          onChange={(event) => {
            if (event.target.value.length == 0) {
              return;
            }
            setAnswer(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              setTextareaRows(textareaRows + 1);
              return;
            }
          }}
          id={`answer`}
          placeholder="Give a brief about your answer here..."
        />
        <div className={`absolute right-4 top-3`}>
          <Button
            type={`submit`}
            variant={`outline`}
            disabled={answer.length == 0}
          >
            Post
          </Button>
        </div>
      </form>

      {/*<Dialog>*/}
      {/*  <DialogTrigger*/}
      {/*    className={`absolute right-4 top-3`}*/}
      {/*    disabled={!isSignedIn || answer.length == 0}*/}
      {/*    asChild*/}
      {/*  >*/}
      {/*    <Button>Submit</Button>*/}
      {/*  </DialogTrigger>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle className={`mb-2`}>Post your answer</DialogTitle>*/}
      {/*    </DialogHeader>*/}

      {/*    <form onSubmit={handleSubmit}>*/}
      {/*      <Input*/}
      {/*        className={`w-full`}*/}
      {/*        placeholder={``}*/}
      {/*        value={answer}*/}
      {/*        onChange={(event) => {*/}
      {/*          setAnswer(event.target.value);*/}
      {/*        }}*/}
      {/*      />*/}
      {/*      <Textarea*/}
      {/*        className={`mt-2 w-full`}*/}
      {/*        rows={4}*/}
      {/*        id={`description`}*/}
      {/*        name={`description`}*/}
      {/*        placeholder={`Describe your answer here...`}*/}
      {/*      />*/}

      {/*      <Button*/}
      {/*        type={`submit`}*/}
      {/*        className={`mt-4 w-full`}*/}
      {/*        variant={`outline`}*/}
      {/*      >*/}
      {/*        Post*/}
      {/*      </Button>*/}
      {/*    </form>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}

      <Toaster />
    </div>
  );
}
