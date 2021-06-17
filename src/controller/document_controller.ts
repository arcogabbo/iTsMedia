import {Router} from "express";
import {Document} from "../model/document";

async function updateDocument(req, res)
{
	if(!req.body.ext)
		return res.status(400).send("cannot find output extension");
	let path = "../../public/files/";
	let name = req.body.fileName.split(".");
	let file = new Document(path, name[0], name[1]);
	console.log(req.body.ext);

	switch (req.body.ext.toLowerCase())
	{
		case "pdf":
			if(!await file.mdToPdf())
				return res.status(500).send("internal server error");
			return res.json({name: file.getName() + ".pdf"});
		case "md":
			console.log("converting docx to md");
			if(!await file.docxToMd())
				return res.status(500).send("internal server error");
			return res.json({name: file.getName() + ".md"});
		default:
			return res.status(400).send("cannot convert file");
	}
}

export {updateDocument}
