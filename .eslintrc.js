const offInDev = process.env.NODE_ENV === 'production' ? 'warn' : 'off'

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'prefer-const': 'off',
    'no-unused-vars': offInDev,
    'vue/no-unused-vars': offInDev,
    'no-undef': offInDev,
    'no-extra-semi': 'off',
    'no-unreachable': offInDev,
    'vue/order-in-components': 'off',
    camelcase: 'off',
    'no-useless-return': 'off',
  },
};
