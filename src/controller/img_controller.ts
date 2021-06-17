import {Router} from "express";
import {parse} from "../model/image";

function updateImg(req, res)
{
	if(!req.body.fileName) return res.status(400).send("Bad request")
	let name = req.body.fileName.split(".");
	if(name.length != 2) return res.status(400).send("Incorrect filename")
	
	let img = parse("../../public/files/", name[0], name[1]);
	if(!req.body.id)
	{
		img.execute()
		return res.status(200).json({name: img.name  + "_edit" + "." + img.ext});
	}
	for(let i = 0; i < req.body.id.length; i++)
	{
		switch (parseInt(req.body.id[i]))
		{
			case 0:
				if(!req.body.sizeX || !req.body.sizeY) return res.status(400).send("Wrong resize parameters")
				img.resize(parseInt(req.body.sizeX), parseInt(req.body.sizeY));
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
			case 3:
				img.monochrome()
				break;
			case 4:
				img.flip()
				break;
			case 5:
				img.flop()
				break;
			case 6:
				if(!req.body.gammaValueSlider) res.status(400).send("Missing gamma value")
				if(parseInt(req.body.gammaValueSlider) < 0.5 || parseInt(req.body.gammaValueSlider) > 2.5) res.status(400).send("Gamma value exceed range")
				img.gamma(parseFloat(req.body.gammaValueSlider))
				break;
			case 7:
				img.normalize()
				break;
			default:
				return res.status(400).send("Action not implemented")
		}
	}
	//execute the command
	img.execute()
	res.status(200).json({name: img.name  + "_edit" + "." + img.ext});
}

export {updateImg}
