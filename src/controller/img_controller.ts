import {Router} from "express";
import {parse} from "../model/image";

function updateImg(req, res)
{
	if(!req.body.fileName || !req.body.id) return res.status(400).send("Bad request")
	let name = req.body.fileName.split(".");
	if(name.length != 2) return res.status(400).send("Incorrect filename")
	
	let img = parse("../../public/files/", name[0], name[1]);
	for(let i = 0; i < req.body.id.length; i++)
	{
		switch (parseInt(req.body.id[i]))
		{
			case 0:
				if(!req.body.X || !req.body.Y) return res.status(400).send("Wrong resize parameters")
				img.resize(parseInt(req.body.X), parseInt(req.body.Y));
				break;
			case 1:
				if(req.body.cropX == 0 || req.body.cropY == 0) return res.status(400).send("Wrong geometry")
				img.crop(parseInt(req.body.posX), parseInt(req.body.posY), parseInt(req.body.cropX),parseInt(req.body.cropY));
				break;
			case 2:
				//blur
				//if radius is not provided or radius is outside planned range
				if(!req.body.blurRadiusSlider || (req.body.blurRadiusSlider < 0 || req.body.blurRadiusSlider > 100)) return res.status(400).send("Wrong radius value")
				if(!req.body.blurSigmaSlider || (req.body.blurSigmaSlider < 0 || req.body.blurSigmaSlider > 100)) return res.status(400).send("Wrong sigma value")
				img.blur(req.body.blurRadiusSlider, req.body.blurSigmaSlider)
				break;
			default:
				res.status(400).send("Action not implemented")
		}
	}
	//execute the command
	img.execute()
	res.status(200).json({name: img.name  + "_edit" + "." + img.ext});
}

export {updateImg}
