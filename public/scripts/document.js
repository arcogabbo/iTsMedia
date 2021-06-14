let select = document.getElementById("outputTypes");
let fileName = document.getElementById("fileName").innerHTML;
document.getElementById("btnConvert").addEventListener("click", convert);
var ext = document.getElementById("ext").innerHTML;
checkTypes();
function checkTypes()
{
	switch (ext)
	{
		case "md":
			select.append(createOption("pdf"));
			break;
		case "docx":
			select.append(createOption("md"));
			select.append(createOption("pdf"));
			break;
		default:
			console.log("unsupported extension");
			break;
	}
}

function convert()
{
	let newExt = $("#outputTypes :selected").attr("id")
	let request = 
		{
			url: "/file",
			method: "put",
			data: {ext: newExt, fileName},
			success: function(result)
			{
				if (!document.getElementById("link")) {
                    var a = document.createElement("A");
                    a.href = "/download/" + result.name;
                    a.innerHTML = "download your file";
                    a.id = "link";
                    a.className="btn deep-orange darken-2"
                    document.getElementById("anchor").appendChild(a);
                 }
			},
			error: function(){console.log("error")}
		}
	$.ajax(request);
}

function createOption(val)
{
	let opt = document.createElement("option");
	opt.text = val;	
	opt.innerText = val;
	opt.setAttribute("id", val);
	return opt;
}
