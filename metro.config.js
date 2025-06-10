const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Exclude react-native-google-mobile-ads from web bundle
config.resolver.platforms = ["native", "web", "ios", "android"];
config.resolver.resolverMainFields = ["react-native", "browser", "main"];
config.resolver.blockList = [
  /node_modules\/react-native-google-mobile-ads\/.*/,
];

module.exports = withNativeWind(config, { input: "./global.css" });
