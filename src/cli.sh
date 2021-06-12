#!/bin/bash
if [ $# -eq 0 ]
  then
    echo "No arguments"
	exit 1
fi

while(("$#"));do
	case "$1" in
		--input|-i)
			inputFile=$2
			shift 2
			;;
		--resize | -r)
			newSize=$2
			shift 2
			;;
		--cut | -cu)
			newLength=$2
			shift 2
			;;
		--crop | -cr)
			newDim=$2
			shift 2
			;;
		--output|-o)
			outputFile=$2
			shift 2
			;;
		*)
			echo "command $1 unknown."
			exit 1
			;;
	esac
done

# -v returns true if variable exists
if [ ! -v inputFile ] || [ ! -v outputFile ]; then
	echo "Input or output file not provided, make sure to use options -i and -o"
	exit 1
fi

#request to upload the file
fileName=$(curl -X POST -F "toUpload=@$inputFile" localhost:8000/clifile)

#newFile=$({curl -X PUT -D "fileName=${fileName}&" localhost:8000/file})