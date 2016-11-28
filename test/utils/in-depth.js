// enables babel transformation for noncompiled node modules
require('babel-register')({
  ignore: /node_modules\/(?!(jcatalog-i18n|jcatalog-react-widgets))/
});
