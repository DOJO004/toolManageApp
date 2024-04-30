/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "standalone",

  // Change images path
  images: {
    loader: "custom",
    loaderFile: "./my-loader.ts",
  },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
};

module.exports = nextConfig;
