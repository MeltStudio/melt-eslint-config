module.exports = {
  extends: ['plugin:@next/next/recommended', './react-ts'],
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
