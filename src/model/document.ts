import {extension, Media} from "./media";
import type ef from "express-fileupload";
import shell from "shelljs";

export class Document extends Media
{
	private fullName;
	constructor(f: ef.UploadedFile | string, id: string, extension: string)
	{
		super(f, id, extension);
		this.fullName = __dirname + "/../../public/files/" + this.getName();
	}	

	public async mdToPdf()
	{
		let command = `pandoc ${__dirname + "/../../public/files/" + this.getName() + "." + this.getExt()} --pdf-engine=pdflatex -o ${__dirname + "/../../public/files/" + this.getName()  + ".pdf"}`;
		return await this.execCommand(command);
	}

	public async docxToMd()
	{
		let command = `pandoc -s ${this.fullName + "." + this.getExt()} -t markdown -o ${this.fullName+".md"}`
		return await this.execCommand(command);
	}

	//the docx file needs to be converted into a markdown before
	public async docxToPdf()
	{
		if(await this.docxToMd())
			if(await this.mdToPdf())
				return true;
		return false;
	}

	private async execCommand(command: string):Promise<boolean>
	{
		console.log("converting " + this.fullName)
		let p = new Promise((resolve, reject)=>
			{
				shell.exec(command, {silent: false, shell: "/bin/bash"}, (code, stdout, stderr)=>{
					if(code != 0)
						reject(false);
					else
						resolve({});
				}
				)})

		if(!await p)
			return false;	

		return true;

	}
}
