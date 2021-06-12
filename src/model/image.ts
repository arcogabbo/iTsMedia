import {extension, Media} from "./media";
import type ef from "express-fileupload";
import gm from "gm";

export class Image extends Media{
	//height: number
	private command:any
 
	constructor(f: ef.UploadedFile | string, id: string, extension: string){
		//media constructor
		super(f,id, extension)
		this.init()
	}

	init(){
		this.command=gm(__dirname + "/../../public/files/" + this.name + '.' +this.ext)
	}

	crop(posX:number, posY:number, dimX:number, dimY:number){
		//call the wrapper to crop the image
		this.command.crop(dimX,dimY, posX, posY)
	}

	resize(dimX:number, dimY:number){
		this.command.resizeExact(dimX,dimY)
	}

	blur(radius:number,sigma:number){
		
		this.command.blur(radius,sigma)
	}

	execute(){
		this.command.write(__dirname + "/../../public/files/" + this.name+'_edit.'+this.ext, (err)=>{
			if(err){
				console.log('ERRORE SALVATAGGIO EDIT IMMAGINE: '+err)
				throw err
			}
		})
	}

	//to extend
}

export function parse(file: ef.UploadedFile | string, id: string, extension: string): Image{
	return new Image(file,id, extension)
}

