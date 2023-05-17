import dotenv from "dotenv";
dotenv.config();

export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
    globals: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
            "<rootDir>/src/assets/mocks/style-mock.js",
        "\\.(css|sass|scss|wav|mp3)$": "identity-obj-proxy",
        "@/(.*)": "<rootDir>/src/$1",
    },
    verbose: true,
    modulePaths: ["<rootDir>"],
};
