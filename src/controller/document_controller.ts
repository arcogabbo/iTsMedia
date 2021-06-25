import {Router} from "express";
import {Document} from "../model/document";

async function updateDocument(req, res)
{
	if(!req.body.ext)
		return res.status(400).send("cannot find output extension");
	let path = "../../public/files/";
	let name = req.body.fileName.split(".");
	let file = new Document(path, name[0], name[1]);

	if(!await file.toMd())
		return res.json({message: "cannot convert to markdown"})

	if(!await file.convert(req.body.ext))
		return res.json({message: "cannot convert file"})

	return res.json({name: file.getName() + "." + req.body.ext});
}

export {updateDocument}
