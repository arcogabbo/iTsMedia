#!/bin/bash
if [ $# -eq 0 ]
  then
    echo "No arguments"
	exit 1
fi

params=""

comando -r 200x100 --cut 10-30 --crop 10 10 20 20

while(("$#"));do
	case "$1" in 
		--resize | -r)
			newSize=$2
			shift 2;;
		--cut | -cu)
			newLength=$2
			shift 2;;
		--crop | -cr)
			newDim=$2
			shift 2;;
		*)
			echo "$1 comando non conosciuto"
			
	
#request to upload the file
fileName=$(curl -X POST -F "toUpload=@$1" localhost:8000/clifile)
newFile=$({curl -X PUT -D "fileName=${fileName}&" localhost:8000/file})
echo $response

