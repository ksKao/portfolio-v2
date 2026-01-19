interface ImportMetaEnv {
  PUBLIC_DIRECTUS_URL: string;
  UMAMI_WEBSITE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
