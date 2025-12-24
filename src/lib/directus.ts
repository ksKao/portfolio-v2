import { createDirectus, readSingleton, rest } from "@directus/sdk";
import type { Schema } from "./directus-schema";

export const directus = createDirectus<Schema>(
  import.meta.env.PUBLIC_DIRECTUS_URL,
).with(rest());

export async function getDirectusContentData(locale: string) {
  return await directus.request(
    readSingleton("content", {
      fields: ["*", { translations: ["*"] }],
      deep: {
        translations: {
          _limit: 1,
          _filter: {
            languages_code: locale,
          },
        },
      },
    }),
  );
}

export type DirectusContentData = Awaited<ReturnType<typeof getDirectusContentData>>