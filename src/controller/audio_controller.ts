import {Router} from "express";
import {AudioVideo} from "../model/audioVideo";
import shell from "shelljs"; 

function updateAudio(req, res)
{
	if(!req.body.cutStart || !req.body.cutEnd || !req.body.fileName)
		return res.status(400).send("Bad request");

	let name = req.body.fileName.split(".");
	let path = "../../public/files/";
	let result = shell.exec(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${__dirname + "/" + path + req.body.fileName}`, {silent:true, shell: "/bin/bash"});	
	if(result.code != 0)
		return res.status(500).send("internal server error");

	let file = new AudioVideo(path, name[0], name[1], parseInt(result.stdout.split(".")[0]));

	switch(parseInt(req.body.id))
	{
		case 0:
			let ret = file.cut(parseInt(req.body.cutStart), parseInt(req.body.cutEnd));
			if(ret == 0)
				return res.json({name: file.name + "_edit." + file.ext});
			else if(ret == -1)
				return res.status(500).json({message: "internal server error"});
			else
				return res.status(400).json({message: "wrong parameters"});
			break;
		default:
			return null;
	}

}

export {updateAudio}
