window.onload=function(){
    //init collapsible
    var collapsibles = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(collapsibles, {
      // options here
    });
	document.getElementById("preview").addEventListener("click", updateIMG);
}

function checkOperations()
{
	var response = {id: []}
	let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked')
	for(let i = 0; i < markedCheckbox.length; i++)
	{
		response.id.push(markedCheckbox[i].id.replace("action", ""));
		let mainDiv = ((markedCheckbox[i].parentNode).parentNode).parentNode
		let data = mainDiv.getElementsByClassName("data");
		for(let j = 0; j < data.length; j++)
			response[data[j].id] = data[j].value;
	}
	return response;
}

function updateIMG() {

    var fileName = document.getElementById("fileName").innerHTML;

    let data = { fileName: fileName, ...checkOperations()};
    var request = {
        url: "/file",
        method: "put",
        data: data,
        success: function (result) {
            if (!document.getElementById("link")) {
                var a = document.createElement("A");
                a.href = "/download/" + result.name;
                a.innerHTML = "download your file";
                a.id = "link";
                a.className="btn deep-orange darken-2"
                document.getElementById("anchor").appendChild(a);
            }

            setTimeout(function(){ 
                $("#editPreview").attr('src','/files/'+result.name+'?t=' + new Date().getTime())

                if($('#editPreview').hasClass('hide'))
                    $('#editPreview').removeClass('hide')
            }, 3000);
        },
        error: function (xhr, status, err) { console.log("errore: "+err); }
    };
    $.ajax(request);
}
