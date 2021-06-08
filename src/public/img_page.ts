var resize = document.getElementById("resize")!.addEventListener("click", function(){updateIMG(0)});
var crop = document.getElementById("crop")!.addEventListener("click", function(){updateIMG(1)});

function updateIMG(id)
{
	if(id < 0 && id > 1)
		return false;

	let dimX = (<HTMLInputElement> document.getElementById("sizeX")!);
	let dimY = (<HTMLInputElement> document.getElementById("sizeY")!);
	if(id == 0 && !(dimX.value && dimY.value))
		return false;

	let cropX = (<HTMLInputElement> document.getElementById("cropX"))!;
	let cropY = (<HTMLInputElement> document.getElementById("cropY"))!;
	let posX = (<HTMLInputElement> document.getElementById("posX"))!;		
	let posY = (<HTMLInputElement> document.getElementById("posY"))!;
	if(id == 1 && !(cropX.value && cropY.value && posX.value && posY.value))
		return false;

	let fileName = document.getElementById("fileName")!.innerHTML;
	let data = {id: id, fileName: fileName}
	//resize
	if(id == 0)
	{
		Object.assign(data, {X: dimX.value});
		Object.assign(data, {Y: dimY.value});
	}
	else if(id == 1)
	{
		Object.assign(data, {cropX: cropX.value});
		Object.assign(data, {cropY: cropY.value});
		Object.assign(data, {posX: posX.value});
		Object.assign(data, {posY: posY.value});	
	}
	console.log(fileName);
	
	let request =
		<any>{
			url: "/img",
			method: "put",
			data:data, 
			success: function(){console.log("success")},
			error: function(){console.log("erroreee")}
		}
	$.ajax(request);
}
