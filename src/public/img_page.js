var resize = document.getElementById("resize").addEventListener("click", function () { updateIMG(0); });
var crop = document.getElementById("crop").addEventListener("click", function () { updateIMG(1); });
function updateIMG(id) {
    if (id < 0 && id > 1)
        return false;
    var dimX = document.getElementById("sizeX");
    var dimY = document.getElementById("sizeY");
    if (id == 0 && !(dimX.value && dimY.value))
        return false;
    var cropX = document.getElementById("cropX");
    var cropY = document.getElementById("cropY");
    var posX = document.getElementById("posX");
    var posY = document.getElementById("posY");
    if (id == 1 && !(cropX.value && cropY.value && posX.value && posY.value))
        return false;
    var fileName = document.getElementById("fileName").innerHTML;
    var data = { id: id, fileName: fileName };
    //resize
    if (id == 0) {
        Object.assign(data, { X: dimX.value });
        Object.assign(data, { Y: dimY.value });
    }
    else if (id == 1) {
        Object.assign(data, { cropX: cropX.value });
        Object.assign(data, { cropY: cropY.value });
        Object.assign(data, { posX: posX.value });
        Object.assign(data, { posY: posY.value });
    }
    console.log(fileName);
    var request = {
        url: "/img",
        method: "put",
        data: data,
        success: function () { console.log("success"); },
        error: function () { console.log("erroreee"); }
    };
    $.ajax(request);
}
