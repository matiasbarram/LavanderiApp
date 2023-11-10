/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: false,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
