import * as z from "zod";

export const TweetValidation = z.object({
  tweet: z.string().nonempty().min(1, { message: "Minimum one character." }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  tweet: z.string().nonempty().min(1, { message: "Minimum one character." }),
});
