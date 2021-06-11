import {extension, Media} from "./media";
import type ef from "express-fileupload";
import shell from "shelljs";

export class Audio extends Media
{
	private length: number; //duration in seconds

	constructor(f: ef.UploadedFile | string, id: string, extension: string, length: number)
	{
		super(f, id, extension);
		this.length = length;
	}

	public cut(start: number, end: number)
	{
		console.log("sto tagliando le palle")
		if(start < 0 || end > this.length || (end-start)<= 0)
			return false;

		let newName = __dirname + "/../../public/files/" + this.name + "_edit." + this.ext;
		let result = shell.exec(`ffmpeg -y -i ${newName.replace("_edit", "")} -ss ${start} -to ${end} -c copy ${newName}`, {silent:false, shell: "/bin/bash"});

		if(result.code!= 0)
		{
			console.log(result.code);
			console.log(result.stdout);
			console.log("cannot cut the audio");
			return false;
		}
		console.log("ho tagliato correttamente");
		return true;
	} 
}
