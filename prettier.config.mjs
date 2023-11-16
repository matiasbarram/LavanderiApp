/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  trailingComma: "es5",
  files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  tabWidth: 4,
  semi: false,
  singleQuote: false,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
