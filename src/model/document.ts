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

	//every file is converted to markdown as a middle language and then
	//the markdown file is converted.
	public async toMd()
	{
		let command = `pandoc --extract-media ${"public/files/" + this.getName()} -s ${this.fullName + "." + this.getExt()} -t markdown -o ${this.fullName+".md"}`
		return await this.execCommand(command);
	}

	public async convert(ext)
	{
		//the intermediate file is already in markdown, no further passages are required
		if(ext === "md"){
			return true
		}
		
		let command = `pandoc -s ${this.fullName + ".md"} -o ${this.fullName + "." + ext}`;
		return await this.execCommand(command);
	}

	private async execCommand(command: string):Promise<boolean>
	{
		let p = new Promise((resolve, reject)=>
			{
				shell.exec(command, {silent: false, shell: "/bin/bash"}, (code, stdout, stderr)=>{
					if(code != 0)
						reject(false);
					else
						resolve({});
				}
				)})

		try{
			let r=await p
			return true
		}catch{
			return false
		}
	}
}
