import {extension, Media} from "./media"
import type ef from "express-fileupload"

export class Image extends Media{
	//width: number
	//height: number
 
	constructor(f: ef.UploadedFile | string, id: string){
		//media constructor
		super(f,id)
	}

	crop(){

	}

	resize(){

	}

	//to extend
}

export function parse(file: ef.UploadedFile): Image{
	return new Image(file,/*function for random id*/"1")
}

