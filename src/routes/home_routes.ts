import { Router } from 'express';
import * as mainController from "../controller/main_controller";
import * as img_controller from "../controller/img_controller";
import * as audio_controller from "../controller/audio_controller";
const router=Router()

//rendering to the home page
router.get("/", mainController.home);
//rendering to the page where the user can modify the image
router.post("/clifile", mainController.cliFile);
router.post("/file", mainController.modifyPage);
router.put("/file", checkType);
router.get("/download/:filename", mainController.downloadFile);

function checkType(req, res)
{
	if(!req.body.fileName)
		return res.status(400).send("file name missing");

	let ext = req.body.fileName.split(".")[1];
	switch(ext.toLowerCase())
	{
		case "png":
		case "jpg":
		case "jpeg":
			img_controller.updateImg(req, res);
			break;
		case "mp3":
			audio_controller.updateAudio(req, res);
			break;
		default:
			res.status(400).send("bad request");
	}
}

export default router;
