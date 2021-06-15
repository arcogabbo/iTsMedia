import { Router } from "express";
import session from "express-session";
import {Media} from "../model/media";
import fs from "fs";
import * as db from "../model/review"

//this function try to upload the file in the "files" directory
//then if succed will render to the page where the user can modify it
function modifyPage(req, res)
{
	//loading the file
	if(!req.files || !req.files.toUpload)
		return res.status(400).send("No file uploaded");
	let toUp = req.files.toUpload;
	if(toUp.size >= 8*1024 * 1024)
	{
		//413 -> Payload too large
		res.status(413).send("File size must be <= 8MB");
		return false;
	}

	let name = toUp.name.split(".");
	let newName = toUp.md5;
	let file = new Media(toUp, newName, name[1]);
	file.save();
	//depending on the file type the user is redirected to a page
	let obj = {fileName: newName + "." + name[1].toLowerCase(), ext:name[1]}
	switch (file.ext)
	{
		case "jpeg":
		case "png":
		case "jpg":
			res.render("imgPage.ejs", obj);
			break;
		case "mp3":
		case "mp4":
		case "ogg":
		case "mkv":
			res.render("audioVideoPage.ejs", obj);
			break;
		case "md":
		case "docx":
			res.render("document.ejs", obj);
			break;
		default:
			res.status(400).send("Unsupported file");
			break;		
	}
}
//this function render to the home page
function home(req, res) :boolean
{
	res.status(200).sendFile("mainPage.html", {root: "public"});
	return true;
}

function downloadFile(req, res)
{
	let file = __dirname + "/../../public/files/" + req.params.filename;
	//md5 is 32 chars wide but we always download the _edit one -> 37 chars
	console.log(file);
	if(req.params.filename.length < 32 || !fs.existsSync(file))
		return res.status(404).send("file not found");
	
	res.download(file);
}

//sending the file name for the cli interface
function cliFile(req, res)
{
	if(!req.files || !req.files.toUpload)	
		return res.status(400).send("missing file");
	let toUp = req.files.toUpload;
	if(toUp.size >= 8*1024 * 1024)
	{
		//413 -> Payload too large
		res.status(413).send("File size must be <= 8MB");
		return false;
	}
	
	let name = toUp.name.split(".");
	let newName = toUp.md5;
	let file = new Media(toUp, newName, name[1]);
	file.save();

	if(file.ext == undefined) return res.status(400).send("Unsupported file")
	res.status(200).send(newName + "." + name[1].toLowerCase());
}

function getFeedback(req,res){
	res.render("feedbackPage.ejs")
}

async function postFeedback(req,res){
	if(!req.body.title || !req.body.content) return res.status(400).send("Title or content missing")
	if(req.body.title.length > 20 || req.body.content.length > 150) return res.status(400).send("Max length reached")
	
	if(!req.body.star){
		req.body.star=null
	}else if(req.body.start < 1 || req.body.star > 5 ){
		return res.status(400).send("Star rating must be between 1 and 5")
	}

	let result=await db.insertReview(req.body.title,req.body.content,req.body.star)

	if(result){
		res.json({message:'The feedback has been sent, thanks.'})
	}else{
		res.status(500).json({message:'Whoops, the feedback went missing on the internet'})
	}
}

export {downloadFile, modifyPage, home, cliFile, getFeedback, postFeedback}
