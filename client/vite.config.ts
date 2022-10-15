import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load app-level env vars to node-level env vars.
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        build: {
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        "react": ["react"],
                        "react-dom": ["react-dom"],
                        "react-router-dom": ["react-router-dom"],
                        "@chakra-ui/react": ["@chakra-ui/react"],
                        "@chakra-ui/icons": ["@chakra-ui/icons"],
                        "react-icons": ["react-icons"],
                        "react-icons/bs": ["react-icons/bs"],
                        "react-icons/gi": ["react-icons/gi"],
                        "react-icons/tb": ["react-icons/tb"],
                        "react-icons/fa": ["react-icons/fa"],
                        "react-icons/vsc": ["react-icons/vsc"],
                        "react-icons/ai": ["react-icons/ai"]
                    }
                }
            }
        },
        resolve: {
            alias: {
                "@components": path.resolve(__dirname, "./src/components"),
                "@contracts": path.resolve(__dirname, "./src/contracts"),
                "@hooks": path.resolve(__dirname, "./src/hooks"),
                "@screens": path.resolve(__dirname, "./src/screens"),
                "@config": path.resolve(__dirname, "./src/config"),
                "@theme": path.resolve(__dirname, "./src/providers/theme"),
                "@animation": path.resolve(__dirname, "./src/providers/animation"),
                "@store": path.resolve(__dirname, "./src/store"),
            }
        },
        plugins: [
            react()
        ]
    };
});
