import {extension, Media} from "./media";
import type ef from "express-fileupload";
import gm from "gm";

export class Image extends Media{
	//width: number
	//height: number
 
	constructor(f: ef.UploadedFile | string, id: string, extension: string){
		//media constructor
		super(f,id, extension)
	}

	crop(posX:number, posY:number, dimX:number, dimY:number, edited: boolean){
		//call the wrapper to crop the image
		let tmp = ".";
		if(edited)
			tmp = "_edit."

		gm(__dirname + "/../../public/files/" + this.name + tmp +this.ext)
		.crop(dimX,dimY, posX, posY)
		.write(__dirname + "/../../public/files/" + this.name+'_edit'+'.'+this.ext, (err)=>{
			if(err){
				console.log('ERRORE SALVATAGGIO EDIT CROP: '+err)
				throw err
			}
		})
	}

	resize(dimX:number, dimY:number, edited: boolean){
		let tmp = ".";
		if(edited)
			tmp = "_edit.";
		gm(__dirname +"/../../public/files/" + this.name+tmp+this.ext)
		.resizeExact(dimX,dimY)
		.write(__dirname + "/../../public/files/" + this.name+'_edit'+'.'+this.ext, (err)=>{
			if(err){
				console.log('ERRORE SALVATAGGIO EDIT RESIZE: '+err)
				throw err
			}
		})
	}

	blur(radius:number,sigma:number, edited: boolean){
		let tmp = ".";
		if(edited)
			tmp = "_edit.";
		gm(__dirname +"/../../public/files/" + this.name+tmp+this.ext)
		.blur(radius,sigma)
		.write(__dirname + "/../../public/files/" + this.name+'_edit'+'.'+this.ext, (err)=>{
			if(err){
				console.log('ERRORE SALVATAGGIO EDIT BLUR: '+err)
				throw err
			}
		})
	}

	//to extend
}

export function parse(file: ef.UploadedFile | string, id: string, extension: string): Image{
	return new Image(file,id, extension)
}

