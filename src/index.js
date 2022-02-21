import Perceptron from "./perceptron";

const canvas = document.getElementById("myCanvas"),
    context = canvas.getContext("2d");
context.fillStyle = "#FFF";
context.lineWidth = 20;
context.w = canvas.width;
context.h = canvas.height;
context.fillRect(0, 0, canvas.width, canvas.height);
context.drawImage(canvas, 0, 0);

let mouse = {
    x: 0,
    y: 0
};
let draw = false;

canvas.addEventListener("mousedown", function (e) {

    console.log(this.offsetLeft);

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    draw = true;
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);
});
canvas.addEventListener("mousemove", function (e) {

    if (draw === true) {

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
    }
});
canvas.addEventListener("mouseup", function (e) {

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
    context.closePath();
    draw = false;
});
document.getElementById("saveButton").onclick = function () {
    let imgData = context.getImageData(0,0, canvas.width, canvas.height);

    console.log(imgData);

    // var dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    // //
    // var img = new Image();
    // /*
    //             img.onload = function () {
    //                 var context = canvas.getContext('2d');
    //                 context.drawImage(img, 0, 0);
    //             }; */
    // img.src = dataURL;
    // console.log(dataURL)
    // // console.log(canvas.data)
    // // document.body.appendChild(img)
    // localStorage.setItem('img', dataURL)
    // sentToServer(dataURL)
    // // downloadImage(dataURL, 'orig.png');

}

document.getElementById("clear").onclick = function () {

    let context = canvas.getContext('2d');
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(canvas, 0, 0);
    // downloadImage(dataURL, 'orig.png');

}

// it will save locally

function downloadImage(data, filename = 'untitled.png') {
    var a = document.getElementById("link");
    a.href = data;
    a.download = filename;
    // document.body.appendChild(a);
    console.log(a)
    a.click();
}

function sentToServer(data) {
    const url = 'http://' + window.location.hostname + ':8000/neural_nets_core/image/';
    console.log('body', JSON.stringify({
        "img": data
    }))
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

            // 'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({
            "img": data
        })
    })
        .then(res => res.json())
        .then(
            (result) => {
                // setData(result.employees)
                console.log(result)
                // document.getElementById("clear").value = result.answer
            },
            // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            // чтобы не перехватывать исключения из ошибок в самих компонентах.
            (error) => {
                console.log(error)
            }
        )
    // window.location.href = window.location.href
}


let img = document.getElementById("answer_image");

/*
            img.onload = function () {
                var context = canvas.getContext('2d');
                context.drawImage(img, 0, 0);
            }; */
img.src = localStorage.getItem('img');
// context.drawImage(img, 0, 0);
//console.log(img)
