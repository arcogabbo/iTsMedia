#!/usr/bin/env node

const yargs=require("yargs/yargs")
const {hideBin} =require("yargs/helpers")
const axios= require("axios")
const fs=require("fs")
const { exec } = require("child_process");

//to upload the file
const FormData = require('form-data');

const form = new FormData();

let argv = yargs(process.argv.slice(2)).argv;
console.log(argv)
//check if input is provided
if(!argv.input || !argv.output){
	console.error("Input and output file must be provided, use --input and --output")
	process.exit(1)
}

form.append('toUpload',fs.createReadStream(argv.input))

axios.post('http://localhost:8000/clifile',form,{headers: form.getHeaders() })
.then((response)=>{
	operate(response)
})
.catch((error)=>{
	console.error(error)
})


function operate(uploadResponse)
{
	let id=[]
	let parameters={}
	let audioVideo=false

	if(uploadResponse.data){
		if(argv.cut){
			audioVideo=true
			let split=argv.cut.split(":")
			id.push('0')
			parameters["cutStart"]=split[0]
			parameters["cutEnd"]=split[1]
		}

		if(argv.resize && !audioVideo){
			let split=argv.resize.split("x")
			id.push('0')
			parameters["sizeX"]=split[0]
			parameters["sizeY"]=split[1]
		}

		if(argv.crop && !audioVideo){
			let split=argv.crop.split("x")
			id.push('1')
			parameters["cropX"]=split[0]
			parameters["cropY"]=split[1].split('+')[0]
			parameters["posX"]=split[1].split('+')[1]
			parameters["posY"]=split[1].split('+')[2]
		}

		if(argv.blur && !audioVideo){
			let split=argv.blur.split(":")
			id.push('2')
			parameters["blurRadiusSlider"]=split[0]
			parameters["blurSigmaSlider"]=split[1]
		}

		if(argv.monochrome && !audioVideo)
			id.push('3')

		if(argv.flip && !audioVideo){
			if(argv.flip === 'horizontal')
				id.push('5')
			else if(argv.flip === 'vertical')
				id.push('4')
			else{
				console.error('Wrong flip parameter, pls use "horizontal" or "vertical"')
				process.exit(1)
			}
		}

		if(argv.gamma && !audioVideo){
			id.push('6')
			parameters["gammaValueSlider"]=argv.gamma
		}

		if(argv.normalize && !audioVideo)
			id.push('7')
	}
	
	let data={
		fileName: uploadResponse.data,
		id,
		...parameters
	}

	//apply edits
	axios.put('http://localhost:8000/file',data,{ headers: { 'Content-Type' : 'application/json; charset=UTF-8' } }).then((response)=>{
		
		//wait 2 seconds then download the file
		sleep(2000).then((res)=>{
			//download file
			exec(`wget localhost:8000/download/${response.data.name} -O ${argv.output}`, (error, stdout, stderr) => {
			    if (error) {
			        console.error(`error: ${error.message}`);
			        return;
			    }
			    if (stderr) {
			        console.log(`stderr: ${stderr}`);
			        return;
			    }
			    console.log(`stdout: ${stdout}`);
			})
		})

	}).catch((error)=>{
		console.error(error)
	})
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}