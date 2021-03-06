import type ef from "express-fileupload"
import fs from "fs"

export type extension= "jpeg" | "jpg" | "png" | "mp3" | "mp4" | "ogg" | "mkv" | "docx" | "md" | "html" | "gfm" | "json" | undefined //to extend as releases goes on

export class Media{
	private name: string
	private ext: extension
	private sizeInBytes: number
	private file: ef.UploadedFile | undefined

	constructor(file: ef.UploadedFile | string, id: string, extension: string){
		if(typeof(file) === "string"){
			this.name=id
			this.ext=check(extension)
			try {
				const f = fs.statSync(__dirname + "/" +  file+id + "." + extension)
			  	this.sizeInBytes=f.size
			  	this.file=undefined
			} catch (err) {
			  console.error("ERRORE LETTURA PROPRIETA' FILE: "+err)
			  this.name=""
			  this.ext=undefined
			  this.sizeInBytes=0
			  this.file=undefined
			}
		}else{
			this.name= id
			this.ext=check(extension)
			this.sizeInBytes=file.size
			this.file=file
		}
	}

	save():void{
		//saving file
		if(typeof(this.ext) != undefined && this.file != undefined){
			const uploadPath = __dirname + '/../../public/files/' + this.name +'.'+ this.ext;
			this.file.mv(uploadPath, (err):void=>{
				if(err)
					throw err
			})
		}
	}

	public getName(): string{return this.name}
	public getExt(): extension{return this.ext}
	public getSize(): number{return this.sizeInBytes}
	public getFile(){return this.file}

}


export function check(s: string): extension{
	switch(s.toLowerCase()){
		case "jpeg":
			return "jpeg"
		case "jpg":
			return "jpg"
		case "png":
			return "png"
		case "mp3":
			return "mp3"
		case "md":
			return "md"
		case "docx":
			return "docx"
		case "mp4":
			return "mp4"
		case "ogg":
			return "ogg"
		case "mkv":
			return "mkv"
		case "html":
			return "html";
		case "gfm":
			return "gfm";
		case "json":
			return "json";
		default:
			return undefined
	}
}
