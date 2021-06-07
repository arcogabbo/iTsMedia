var resize = document.getElementById("resize").addEventListener("click", resizeImg);
function resizeImg() {
    var dimX = document.getElementById("sizeX").value;
    var dimY = document.getElementById("sizeY").value;
    var fileName = document.getElementById("fileName").innerHTML;
    if (!(dimX && dimY))
        return false;
    console.log(fileName);
    var request = {
        url: "/img",
        method: "put",
        data: {
            fileNmae: fileName,
            X: dimX,
            Y: dimY
        },
        success: function () { console.log("success"); },
        error: function () { console.log("erroreee"); }
    };
    $.ajax(request);
}
