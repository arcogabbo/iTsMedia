import {Router} from "express";
import {parse} from "../model/image";

function updateImg(req, res)
{
	let name = req.body.fileName.split(".");
	let img = parse("../public/files/", name[0], name[1]);
	console.log("update img" + req.body.id)
	switch (parseInt(req.body.id))
	{
		case 0:
			//img.resize();
			console.log("resize");
			break;
		case 1:
			//img.crop();
			console.log("crop");
			break;
	}
}

export {updateImg}
