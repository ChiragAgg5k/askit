import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import * as z from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const gptRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.prompt === "") return undefined;

      const completion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: input.prompt,
        temperature: 0.7,
        top_p: 1,
        max_tokens: 1000,
      });

      const result = completion.choices[0];
      return result;
    }),
});
