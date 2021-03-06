var babel = require('babel-core');

module.exports = {
  process: function (src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        presets: [
          require('babel-preset-es2015'),
          require('babel-preset-react'),
          require('babel-preset-stage-0')
        ],
        plugins: ['transform-decorators-legacy']
      }).code;
    } else {
      return src;
    }
  }
};
