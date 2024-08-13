import { z } from "zod";

export const imageSchema = z.object({
  originalname: z.string(),
  mimetype: z.string().refine((type) => type.startsWith('image/'), {
    message: "File extension must be image"
  }),
  size: z.number().max(5 * 1024 * 1024) 
});
