const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "bytebank",
    projectName: "navbar",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  if (!webpackConfigEnv.standalone) {
    defaultConfig.externals.push(
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@bytebank/user-widget"
    );
  }

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
