import { z } from "zod";
const fileSizeLimit = 1024 * 1024 * 1;

export const fileUploadSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .refine(
      (files) => files.length <= 10,
      "파일은 한번에 10개까지만 업로드 가능합니다."
    )
    .transform((files) => Array.from(files).map((file) => file))
    .refine(
      (files) => files.every((file) => file.size < fileSizeLimit),
      "파일은 1MB 이하만 업로드 가능합니다."
    ),
});
