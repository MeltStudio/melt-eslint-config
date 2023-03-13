module.exports = {
  extends: ['plugin:@next/next/recommended', require.resolve('./react-ts')],
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
