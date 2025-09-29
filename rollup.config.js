import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { defineConfig } from "rollup";

export default defineConfig([
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
                sourcemap: true,
            },
            {
                file: "dist/index.esm.js",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            json(),
            typescript({
                tsconfig: "./tsconfig.json",
                exclude: ["**/__tests__/**"],
            }),
        ],
        external: [
            "react",
            "react-dom",
            "@mui/material",
            "@mui/material/styles",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled",
        ],
    },
    {
        input: "dist/types/auth.d.ts",
        output: [{ file: "dist/auth.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.css$/],
    },
]);
