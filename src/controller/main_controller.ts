import { Router } from "express";
import session from "express-session";
import Media from "../model/media";
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
		res.status(200).send("file size must be < 8MB");
	toUp.name = Math.floor(Math.random() * 1000000);
	let file = new Media(toUp, toUp.name);
	file.save();
	toUp.name += "." + file.ext;
	//depending on the file type the user is redirected to a page
	let obj = {fileName: toUp.name}
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

//this function render to the home page
function home(req, res) :boolean
{
	res.status(200).sendFile("mainPage.html", {root: "src/public"});
	return true;
}

export {modifyPage, home}
