module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(json)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-controls",
    "@storybook/addon-docs",
    "@storybook/addon-toolbars",
    "@storybook/addon-viewport",
    "../src/addons/theme-selector/preset.js"
  ],
  "framework": "@storybook/server"
}