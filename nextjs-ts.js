module.exports = {
  extends: [
    'plugin:@next/next/recommended',
    '@meltstudio/eslint-config/react-ts',
  ],
  rules: {
    'jsx-a11y/alt-text': [
      'warn',
      {
        elements: ['img'],
        img: ['Image'],
      },
    ],
  },
};
