import type ef from "express-fileupload"
import fs from "fs"

export type extension= "jpeg" | "jpg" | "png" | undefined //to extend as releases goes on

export class Media{
	name: string
	ext: extension
	sizeInBytes: number
	file: ef.UploadedFile | undefined

	constructor(file: ef.UploadedFile | string, id: string){
		if(typeof(file) === "string"){
			let split=id.split(".")
			this.name=split[0]
			this.ext=check(split[1])
			try {
				//path + id(name+ext)
			  	const f = fs.statSync(file+id)
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
			let split=file.name.split('.')
			this.name= id
			this.ext=check(split[1])
			this.sizeInBytes=file.size
			this.file=file
		}
	}

	save():void{
		//saving file
		if(typeof(this.ext) != undefined && this.file != undefined){
			const uploadPath = __dirname + '../public/files/' + this.name +'.'+ this.ext;
			this.file.mv(uploadPath, (err):void=>{
				if(err)
					throw err
			})
		}
	}
}

export function check(s: string): extension{
	switch(s){
		case "jpeg":
			return "jpeg"
		case "jpg":
			return "jpg"
		case "png":
			return "png"
		default:
			return undefined
	}
}