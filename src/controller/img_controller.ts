import {Router} from "express";
import parse from "../model/image";

function updateImg(req, res)
{
	let img = parse("../public/files/", req.body.fileName);
	switch (req.body.id)
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
