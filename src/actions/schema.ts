import { z } from "zod";

const socials = z.object({
  handle: z.string().min(1, {
    message: "Type in your @username",
  })
  .regex(/^[^@]*$/, {
    message: "Do not include the '@' symbol",
  })
  ,
  type: z.string(),
});

const socialFormSchema = z.object({
  socials: z.array(socials),
});

export default socialFormSchema;
