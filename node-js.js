module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', require.resolve('./base')],
};
