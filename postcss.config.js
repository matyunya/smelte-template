const extractor = require("smelte/src/utils/css-extractor.js");

module.exports = (purge = false) => {
  return [
    require("postcss-import")(),
    require("postcss-url")(),
    require("postcss-input-range")(),
    require("autoprefixer")(),
    require("tailwindcss")("./tailwind.config.js"),
    purge &&
      require("cssnano")({
        preset: "default"
      }),
    purge &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./**/*.svelte"],
        extractors: [
          {
            extractor,
            extensions: ["svelte"]
          }
        ],
        whitelist: ["html", "body", "stroke-primary"],
        whitelistPatterns: [/ripple/]
      })
  ].filter(Boolean);
};
