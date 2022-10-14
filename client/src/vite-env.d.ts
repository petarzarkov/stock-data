/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv {
    readonly EXPLODE_TEMP: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
