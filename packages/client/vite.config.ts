import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    ssr: {
        target: "node",
        format: "cjs",
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            input: {
                app: "./index.html",
                serviceWorker: "./serviceWorker.js",
            },
            output: {
                entryFileNames: chunkInfo =>
                    chunkInfo.name === "serviceWorker"
                        ? "[name].js"
                        : chunkInfo.name === "entry-server"
                        ? "[name].cjs"
                        : "assets/[name]-[hash].js",
            },
        },
    },
});
