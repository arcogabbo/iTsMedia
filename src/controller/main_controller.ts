import { Router } from "express";
import session from "express-session";
import {Media} from "../model/media";
//this function try to upload the file in the "files" directory
//then if succed will render to the page where the user can modify it
function modifyPage(req, res)
{
	//var sess = {secret: "change me"}
	//loading the file
	if(!req.files)
		return res.status(400).send("No file uploaded");
	let toUp = req.files.toUpload;
	if(toUp.size > 8*1024 * 1024)
	{
		res.status(200).send("file size must be < 8MB");
		return false;
	}

	let name = toUp.name.split(".");

	//et newName= Math.floor(Math.random() * 1000000).toString();
	let newName = toUp.md5;
	console.log(newName);
	let file = new Media(toUp, newName, name[1]);
	file.save();
	//depending on the file type the user is redirected to a page
	let obj = {fileName: newName + "." + name[1]}
	switch (file.ext)
	{
		case "jpeg":
		case "png":
		case "jpg":
			res.render("imgPage.ejs", obj);
			break;
		/*case "audio/mpeg":
			res.sendFile("audioPage.ejs", {root: "src/view"});
			break;*/
		default:
			res.status(400).send("unsupported file");
			break;		
	}
}
//this function render to the home page
function home(req, res) :boolean
{
	res.status(200).sendFile("mainPage.html", {root: "src/public"});
	return true;
}

export {modifyPage, home}
