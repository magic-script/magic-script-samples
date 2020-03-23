printf "\033c"

echo "building app..."
magic-script build -i
magic-script run

say -v Melina 'lumin build done'
