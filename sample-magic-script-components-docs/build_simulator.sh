printf "\033c"

echo "1. building app..."
magic-script build -h

echo "2. running in simulator..."
cd lumin/.out/app
mxs bin/index.js
cd ../../../

say -v Melina 'lumin simulator build done'
