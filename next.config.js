/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    // add images url
    images: {
        domains: ["res.cloudinary.com", "cdn.discordapp.com", "avatars.githubusercontent.com", "media1.tenor.com"],
    },
};

export default config;
