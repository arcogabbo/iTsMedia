import {extension, Media} from "./media";
import type ef from "express-fileupload";
import shell from "shelljs";

export class AudioVideo extends Media
{
	private length: number; //duration in seconds

	constructor(f: ef.UploadedFile | string, id: string, extension: string, length: number)
	{
		super(f, id, extension);
		this.length = length;
	}

	//return -1 for internal server error, 0 for ok, 1 for wrong parameters
	public cut(start: number, end: number)
	{
		if(start < 0 || end > this.length || (end-start)<= 0)
			return 1;

		let newName = __dirname + "/../../public/files/" + this.getName() + "_edit." + this.getExt();
		let result = shell.exec(`ffmpeg -y -i ${newName.replace("_edit", "")} -ss ${start} -to ${end} ${newName}`, {silent:true, shell: "/bin/bash"});

		if(result.code!= 0)
		{
			console.log(result.code);
			console.log(result.stdout);
			console.log("cannot cut the audio or video");
			return -1;
		}
		return 0;
	} 
}
