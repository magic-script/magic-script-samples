printf "\033c"

echo "building app..."
yarn
cd reactnative
yarn
cd ios
pod install
cd ../../

say -v Melina 'i o s build done'
