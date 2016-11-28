require("babel-register")({
  presets: [
    require('babel-preset-es2015'),
    require('babel-preset-react'),
    require('babel-preset-stage-0')
  ],
  plugins: ['transform-decorators-legacy']
});
