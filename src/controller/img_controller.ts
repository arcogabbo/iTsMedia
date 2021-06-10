import {Router} from "express";
import {parse} from "../model/image";

function updateImg(req, res)
{
	if(!req.body.fileName || !req.body.id) return res.status(400).send("Bad request")
	let name = req.body.fileName.split(".");
	if(name.length != 2) return res.status(400).send("Incorrect filename")
	
	let img = parse("../../public/files/", name[0], name[1]);
	switch (parseInt(req.body.id))
	{
		case 0:
			img.resize(parseInt(req.body.X), parseInt(req.body.Y));
			res.status(200).json({name: img.name  + "_edit" + "." + img.ext});
			break;
		case 1:
			if(req.body.cropX == 0 || req.body.cropY == 0) return res.status(400).send("Wrong geometry")
			img.crop(parseInt(req.body.posX), parseInt(req.body.posY), parseInt(req.body.cropX),parseInt(req.body.cropY));
			res.status(200).json({name: img.name + "_edit" + "." + img.ext});
			break;
		default:
			res.status(400).send("Action not implemented")
	}
}

export {updateImg}
