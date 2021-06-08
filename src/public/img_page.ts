var resize = document.getElementById("resize")!.addEventListener("click", resizeIMG);
var crop = document.getElementById("crop")!.addEventListener("click", cropIMG);

function resizeIMG(id)
{
	if(id != 0 || id != 1)
		return false;

	let dimX = (<HTMLInputElement> document.getElementById("sizeX")!).value;
	let dimY = (<HTMLInputElement> document.getElementById("sizeY")!).value;
	if(!(dimX && dimY) && id == 0)
		return false;

	let cropX = (<HTMLInputElement> document.getElementById("cropX"))!.value;
	let cropY = (<HTMLInputElement> document.getElementById("cropY"))!.value;
	let posX = (<HTMLInputElement> document.getElementById("posX"))!.value;		
	let posY = (<HTMLInputElement> document.getElementById("posY"))!.value;
	if(!(cropX && cropY && posX && posY) && id == 1)
		return false;

	let fileName = (<HTMLElement> document.getElementById("fileName")!).innerHTML;
	
	let request =
		<any>{
			url: "/img",
			method: "put",
			data: 
			{
				id: id,
				//fileName is needed to select the correct file
				fileNmae: fileName,
				X: dimX, 
				Y: dimY,
				cropX: cropX,
				cropY: cropY,
				posX: posX,
				posY: posY
			},
			success: function(){console.log("success")},
			error: function(){console.log("erroreee")}
		}
	$.ajax(request);
}

function cropIMG()
{
	let request =
		{
			
		}
}
