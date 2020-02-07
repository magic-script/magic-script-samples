printf "\033c"

echo "1. Updating .babelrc for Android..."
babelrcPath=".babelrc"
babelrcPluginName="        \/\/ \"@babel\/plugin-proposal-class-properties\""
sed -i '' "5 s/.*/$babelrcPluginName/" $babelrcPath

echo "2. Updating babel.config.js for Android..."
babelConfigPath="babel.config.js"
babelConfigExportName="  presets: ['module:metro-react-native-babel-preset'],"
sed -i '' "2 s/.*/$babelConfigExportName/" $babelConfigPath

echo "3. Removing node_modules..."
rm -fr node_modules
echo "4. Removing remote assets..."
rm -fr assets/fonts
rm -fr assets/lumin_system_icons
echo "5. Removing yarn.lock..."
rm -fr yarn.lock
echo "6. Removing package-lock.json"
rm -fr package-lock.json
echo "7. Renaming NOTICE file..."
mv NOTICE NOTICE_tmp
echo "8. Clear watchman"
watchman watch-del-all >/dev/null
echo "9. Clear Yarn"
yarn cache clean
echo "10. Install Yarn"
yarn
echo "11. Reverting NOTICE file..."
mv NOTICE_tmp NOTICE
say -v Melina done
echo "12. Uninstall old app"
adb uninstall com.catalog >/dev/null
echo "13. Install and run on android device"
react-native run-android >/dev/null

