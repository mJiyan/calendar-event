module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'],
  env: {
    production: {
      only: ['src'],
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
          },
        ],
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: [
        "@babel/plugin-proposal-class-properties",
        ["babel-plugin-styled-components", { "displayName": true }],
        "@babel/plugin-syntax-dynamic-import"
      ],
      presets: ["@babel/preset-env", "@babel/preset-react"]
    }
  },
};
