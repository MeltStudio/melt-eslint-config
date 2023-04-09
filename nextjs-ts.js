module.exports = {
  extends: ['plugin:@next/next/recommended', require.resolve('./react-ts')],
  rules: {
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img'],
        img: ['Image'],
      },
    ],
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['jsx', 'global'],
      },
    ],
  },
};
