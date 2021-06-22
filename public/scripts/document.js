let select = document.getElementById("outputTypes");
let fileName = document.getElementById("fileName").innerHTML;
document.getElementById("btnConvert").addEventListener("click", convert);
var ext = document.getElementById("ext").innerHTML;

function convert()
{
	let newExt = $("#outputTypes :selected").html();
	console.log(newExt);
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
				else
				{
					let a = document.getElementById("link");
					a.href = "/download/" + result.name;
				}
			},
			error: function(){console.log("error")}
		}
	$.ajax(request);
}
