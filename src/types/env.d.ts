interface ImportMetaEnv {
  readonly NEXT_PUBLIC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const process: {
  env: {
    NEXT_PUBLIC_API_URL: string;
  };
};
