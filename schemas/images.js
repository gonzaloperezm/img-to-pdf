import { z } from "zod";

export const imageSchema = z.object({
  originalname: z.string(),
  mimetype: z.string().refine((type) => type.startsWith('image/'), {
    message: "Debe ser un tipo de imagen válido"
  }),
  size: z.number().max(5 * 1024 * 1024) // tamaño máximo de 5MB
});
