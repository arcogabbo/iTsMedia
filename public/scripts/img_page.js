window.onload=function(){
    //init collapsible
    var collapsibles = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(collapsibles, {
      // options here
    });

    var resize = document.getElementById("resize").addEventListener("click", function () { updateIMG(0); });
    var crop = document.getElementById("crop").addEventListener("click", function () { updateIMG(1); });
    var blur= document.getElementById("blur").addEventListener("click", function () { updateIMG(2); });
}

function updateIMG(id) {
    if (id < 0 && id > 2)
        return false;
    var dimX = document.getElementById("sizeX");
    var dimY = document.getElementById("sizeY");
    if (id == 0 && !(dimX.value && dimY.value))
        return false;
    var cropX = document.getElementById("cropX");
    var cropY = document.getElementById("cropY");
    var posX = document.getElementById("posX");
    var posY = document.getElementById("posY");

    var rad=document.getElementById("blurRadiusSlider");
    var sigma=document.getElementById("blurSigmaSlider");

    if (id == 1 && !(cropX.value && cropY.value && posX.value && posY.value))
        return false;

    var fileName = document.getElementById("fileName").innerHTML;

    var data = { id: id, fileName: fileName };

    switch(id){
        case 0:
            Object.assign(data, { X: dimX.value });
            Object.assign(data, { Y: dimY.value });
            break;
        case 1:
            Object.assign(data, { cropX: cropX.value });
            Object.assign(data, { cropY: cropY.value });
            Object.assign(data, { posX: posX.value });
            Object.assign(data, { posY: posY.value });
            break;
        case 2:
            Object.assign(data,{radius:rad.value})
            Object.assign(data,{sigma:sigma.value})
            break;
    }

    var request = {
        url: "/img",
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
