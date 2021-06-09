import {Router} from "express";
import {parse} from "../model/image";

function updateImg(req, res)
{
	let name = req.body.fileName.split(".");
	let img = parse("../public/files/", name[0], name[1]);
	console.log("update img " + req.body.id)
	switch (parseInt(req.body.id))
	{
		case 0:
			console.log('resize '+typeof(req.body.X))
			img.resize(parseInt(req.body.X), parseInt(req.body.Y));
			console.log("resize");
			break;
		case 1:
			img.crop(parseInt(req.body.posX), parseInt(req.body.posY), parseInt(req.body.cropX),parseInt(req.body.cropY));
			console.log("crop");
			break;
	}
}

export {updateImg}
