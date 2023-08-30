const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "process": require.resolve("process/browser.js"),
    "util": require.resolve("util/"),
    "assert": require.resolve("assert"),
    "buffer": require.resolve("buffer/"),
    //"http": require.resolve("stream-http"),
    //"https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "zlib": require.resolve("browserify-zlib"),
    //"url": require.resolve("url")
  })
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer']
    })
  ])
  return config;
}
