/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    // add images url
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com"
            },
            {
                protocol: "https",
                hostname: "cdn.discordapp.com"
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com"
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com"
            },
            {
                protocol: "https",
                hostname: "pbs.twimg.com"
            },
            {
                protocol: "https",
                hostname: "i.imgur.com"
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com"
            },
            {
                protocol: "https",
                hostname: "media.discordapp.net"
            },
            {
                protocol: "https",
                hostname: "cdn.discordapp.com"
            },
            {
                protocol: "https",
                hostname: "media.tenor.com"
            },
            {
                protocol: "https",
                hostname: "media1.tenor.com"
            }
        ],
    },
};

export default config;
