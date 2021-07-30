status = "";
objects = [];
function preload() {
    img = loadImage("20210718_125229.jpg");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("s_value").innerHTML = "Detecting Objects";
}

function draw(){
    image(img, 0, 0, 400, 400);
    if (status != "") {
        for (i=0; i<objects.length; i++) {
            percent = " "+floor(objects[i].confidence*100) + "%";
            fill("#FF0000");
            text(objects[i].label + percent, objects[i].x + 15, objects[i].y+20);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("s_value").innerHTML = "Objects Detected";
        }
    }

}

function back() {
    window.location = 'index.html';
}

function modelLoaded() {
    console.log("Model Initialized!");
    status = true;
    objectDetector.detect(img, gotResults);
}
 function gotResults(error, results) {
     if (error) {
         console.error(error);
     }
     else {
         console.log(results);
         objects = results;
     }
 }