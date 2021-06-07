import { Router } from "express";
import {files} from "../server";

//this function try to upload the file in the "files" directory
//then if succed will render to the page where the user can modify it
function modifyPage(req, res)
{
	//loading the file
	if(!req.files)
		return res.status(400).send("No file uploaded");
	let file = req.files.toUpload;
	file.mv(__dirname + "/../files/" + file.name, (err)=>
		{
			if (err)
      			return res.status(500).send(err);

			//depending on the file type the user is redirected to a page
			/*ciao bello puoi eliminare questo commento una volta letto,
			 * una volta che l'utente carica il file se sul server c'è già un file con
			 * lo stesso nome viene sovrascritto quindi ho pensato che potremmo far caricare 
			 * comunque il file all'untente ma nel backend modifichiamo il nome in modo che non
			 * si sovrascrivano altri file, il nome lo metto nella pagina ejs in modo da poterlo 
			 * ottenere lato client per poter poi fare la richiesta con le modifiche al server*/
			let obj = {fileName: file.name}
			//checkFile(file); qui è già tardi
			switch (file.mimetype)
			{
				case "image/jpeg":
					res.render("imgPage.ejs", obj);
					break;
				case "image/png":
					res.render("imgPage.ejs", obj);
					break;
					/*case "audio/mpeg":
					res.sendFile("audioPage.ejs", {root: "src/view"});
					break;*/
				default:
					res.status(400).send("unsupported file");
					break;
			}
		})		
}

/*da chiamare prima che il file venga uploadato*/
//checking if there is another file with the same name
function checkFile(file)
{
	for(let i = 0; i < files.length; i++)
	{
		//if "file.ext" already exist then it is renamed as "file1.ext"
		if(files[i]===file)
		{
			let splitted = file.split(".", 2);
			splitted[0] + "1" + splitted[1];
			file = splitted [0];
		}
	}
	files.push(file);
}

//this function render to the home page
function home(req, res) :boolean
{
	res.status(200).sendFile("mainPage.html", {root: "src/view"});
	return true;
}

export {modifyPage, home}
