var resize = document.getElementById("resize")!.addEventListener("click", resizeImg);

function resizeImg()
{
	let dimX = (<HTMLInputElement> document.getElementById("sizeX")!).value;
	let dimY = (<HTMLInputElement> document.getElementById("sizeY")!).value;
	let fileName = (<HTMLElement> document.getElementById("fileName")!).innerHTML;
	if(!(dimX && dimY))
		return false;

	let request =
		<any>{
			url: "/img",
			method: "put",
			data: 
			{
				//fileName is needed to select the correct file
				fileNmae: fileName,
				X: dimX, 
				Y: dimY
			},
			success: function(){console.log("success")},
			error: function(){console.log("erroreee")}
		}
	$.ajax(request);
}
