#!/bin/bash

components=(
button
circleconfirmation
colorpicker
datepicker
dropdownlist
dropdownlistitem
gridlayout
image
line
linearlayout
listview
listviewitem
model
pageview
panel
progressbar
rectlayout
scrollbar
scrollview
slider
spinner
tab
text
textedit
timepicker
toggle
togglegroup
webview
)

show_usage (){
    cat <<EOF

Usage: screenshot [-s|--single|--no-cut] [PLATFORM] 

 Values for PLATFORM are:

    android     take a screenshot and cut for android device 
    ios         take a screenshot and cut for ios device 
    lumin       take a screenshot and cut for lumin device 

 optional arguments:

    [-s|--single]   takes only one screenshot, need to be toghether with component name
    [--no-cut]      takes screenshot without cutting edges
    [-h|--help]     show this help page

 example: 
    screenshot --no-cut -s datepicker android

 default directory with screenshot ~/ScreenShotsComponents/
 
 OPT
EOF

    exit 1
}

SINGLE=false
SINGLE_FILENAME=""
CUTTING=true

android(){
    mkdir -p ~/ScreenShotsComponents

    if $SINGLE 
    then
        android_screenshot $SINGLE_FILENAME
        sleep 5
        android_cut $SINGLE_FILENAME
    else
        for component in "${components[@]}"; do
            echo "component: $component"
            android_screenshot $component
            sleep 10;
        done;

        for component in "${components[@]}"; do
            android_cut $component
        done
    fi
    echo "done"
}

android_screenshot() {
    FILENAME=$1/android.png
    echo "filename: $FILENAME"
    mkdir -p ~/ScreenShotsComponents/$1
    adb shell rm /sdcard/$1.png
    adb shell screencap -p /sdcard/$1.png &
}

android_cut() {
        FILENAME=~/ScreenShotsComponents/$1/android.png
        rm $FILENAME
        echo "downloading $1.png"
        adb pull /sdcard/$1.png $FILENAME
        adb shell rm /sdcard/$1.png
    if $CUTTING 
    then
        echo "trimming $1"
        convert $FILENAME \
        -chop 0x400 -gravity South -chop 0x400 \
        -bordercolor red -border 3x3 -fuzz 10% -trim +repage \
        -chop 10x10 -gravity SouthEast -chop 10x10 \
        -resize 800x800 -background black -gravity center -extent 800x800 \
        $FILENAME
    fi
}

ios(){
    mkdir -p ~/ScreenShotsComponents

    if $SINGLE 
    then
        ios_screenshot $SINGLE_FILENAME
        sleep 5
        ios_cut $SINGLE_FILENAME
    else 
        for component in "${components[@]}"; do
            echo "component: $component"
            ios_screenshot $component
            sleep 10;
        done;

        echo "cutting edges"
        sleep 5;

        for component in "${components[@]}"; do
            echo "component: $component"
            ios_cut $component
        done
    fi
    echo "done"
}

ios_screenshot() {
    FILENAME=$1/ios.png
    echo "filename: $FILENAME"
    mkdir -p ~/ScreenShotsComponents/$1
    xcrun simctl io booted screenshot $HOME/ScreenShotsComponents/$FILENAME &
}

ios_cut() {
    if $CUTTING 
    then
        FILENAME=~/ScreenShotsComponents/$1/ios.png
        convert $FILENAME \
        -chop 0x400 -gravity South -chop 0x400 \
        -bordercolor red -border 3x3 -trim +repage \
        -resize 800x800 -background black -gravity center -extent 800x800 \
        $FILENAME;
    fi
}

lumin(){
    mkdir -p ~/ScreenShotsComponents

    if $SINGLE 
        then
            lumin_screenshot $SINGLE_FILENAME
            sleep 5
            lumin_cut $SINGLE_FILENAME
        else 
            for component in "${components[@]}"; do
                echo "component: $component"
                lumin_screenshot $component
                sleep 10;
            done

            for component in "${components[@]}"; do
                lumin_cut $component
            done
        fi

    echo "done"
}

lumin_screenshot(){
    FILENAME=$1/lumin.png
    echo "filename: $HOME/ScreenShotsComponents/$FILENAME"
    mkdir -p ~/ScreenShotsComponents/$1
    mldb capture image -r $HOME/ScreenShotsComponents/$FILENAME &
}

lumin_cut(){
    if $CUTTING 
    then
        FILENAME=~/ScreenShotsComponents/$1/lumin.png
        echo "trimming $1"
        convert $FILENAME \
        -chop 200x0 -gravity SouthEast -chop 200x0 \
        -bordercolor red -border 3x3 -fuzz 15% -trim +repage \
        -chop 10x10 -gravity SouthEast -chop 10x10 \
        -resize 800x800 -background black -gravity center -extent 800x800 \
        $FILENAME
    fi
}

while [ "$1" != "" ]; do
    case $1 in
        android) shift
            android
            open ~/ScreenShotsComponents
            ;;
        ios) shift
            ios
            open ~/ScreenShotsComponents
            ;;
        lumin) shift
            lumin
            open ~/ScreenShotsComponents
            ;;
        -s | --single )         shift
                                SINGLE=true
                                SINGLE_FILENAME=$1
                                ;;
        --no-cut)              
                                CUTTING=false 
                                ;;                       
        -h | --help )           show_usage
                                exit
                                ;;
        * )                     show_usage
                                exit 1
    esac
    shift
done
