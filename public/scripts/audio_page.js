document.getElementById("cut").addEventListener("click", function(){cutFile(0)});

//init collapsible
var collapsibles = document.querySelectorAll('.collapsible');
var instances = M.Collapsible.init(collapsibles, {});
// options here


function cutFile(id)
{
	let cutStart = document.getElementById("cutStart").value;
	let cutEnd = document.getElementById("cutEnd").value;
	let fileName = document.getElementById("fileName").innerHTML;

	if(!cutStart || !cutEnd)
		return false;

	let request = 
		{
			url: "/file",
			method: "put",
			data: {cutStart, cutEnd, fileName, id},
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

           		setTimeout(function(){ 
	            	$("#editPreview").attr('src','/files/'+result.name+'?t=' + new Date().getTime())
	            	$("#editPreview").load()

	                if($('#preview-block').hasClass('hide'))
	                    $('#preview-block').removeClass('hide')
	            }, 3000);
			},
			error: function(xhr, statuse)
			{
				console.log(xhr);
				console.log(statuse);
			}
		}
	$.ajax(request);
}
