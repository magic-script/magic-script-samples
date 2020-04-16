/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const defaultAssetExts = require('metro-config/src/defaults/defaults')
  .assetExts;

module.exports = {
  projectRoot: path.resolve(__dirname),
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  watchFolders: [
    path.resolve(__dirname, '../common'),
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, '../node_modules'),
    path.resolve(__dirname, '../resources'),
    path.resolve(__dirname, '../assets')
  ],
  resolver: {
    assetExts: [
      ...defaultAssetExts,
      // 3D Model formats
      'glb',
      'obj',
      'gltf'
    ],
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => path.join(process.cwd(), `node_modules/${name}`)
      }
    )
  }
};
