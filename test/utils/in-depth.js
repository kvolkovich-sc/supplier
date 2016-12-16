// enables babel transformation for noncompiled node modules
require('babel-register')({
  ignore: /node_modules\/(?!(opuscapita-i18n))/
});
