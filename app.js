
//Displays the original image after being uploaded
function displayOriginalImage(event) {
  if (event.files.length != 0) {
    if (checkFileName(event.files[0].name)) {
      document.getElementById("inputImage").src = window.URL.createObjectURL(event.files[0]);
      document.getElementById("originalImage").style.display = "initial";
      document.getElementById("transformation").style.display = "initial";
      document.getElementById("result").style.display = "none";
    }
  }
}
function getequation(x1,x2,y1,y2){
  let slope =(y2-y1)/(x2-x1);
  let constant = y1-slope*x1;
  return{
    slope , constant

  };
}


//Makes sure the uploaded file is a png or jpg image 
function checkFileName(fileName) {
  if (fileName == "") {
    alert("Browse to upload a valid File with png or jpg extension");
    return false;
  }
  else if (fileName.split(".")[1].toUpperCase() == "PNG" || fileName.split(".")[1].toUpperCase() == "JPG")
    return true;
  else {
    alert("File with " + fileName.split(".")[1] + " is invalid. Upload a valid file with png or jpg extensions");
    return false;
  }
}

//Displays the corresponding form to the selected transformation and hides the other forms
function showTransformForm() {
  const increaseBrightnessForm = document.getElementById("increaseBrightnessForm");
  const decreaseBrightnessForm = document.getElementById("decreaseBrightnessForm");
  const increaseContrastForm = document.getElementById("increaseContrastForm");
  const decreaseContrastForm = document.getElementById("decreaseContrastForm");
  //Write your code here for the other forms

  const mylist = document.getElementById("myList");

  //Storing the type chosen in a variable
  transformType = mylist.options[mylist.selectedIndex].text;

  //Displaying to the user the type he chose by changing the text element of id= transformType to the selected type
  document.getElementById("transformType").value = mylist.options[mylist.selectedIndex].text;

  if (transformType == "Increase Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "initial";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("Inverse").style.display = "none";

  } else if (transformType == "Decrease Brightness") {
    /////////////////////////new /////////////////////
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "initial";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("Inverse").style.display = "none";
    ///////////////////////           //////////////////////////////
    

  } else if (transformType == "Increase Contrast") {
    //Write your code here
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "initial";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("Inverse").style.display = "none";

  } else if (transformType == "Decrease Contrast"){
    //Write your code here
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "initial";
    document.getElementById("Inverse").style.display = "none";
  }else{
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("Inverse").style.display = "initial";

  }

  // Listener to the event of submiting the increase brightness form
  increaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib = document.getElementById("ib").value
    increaseBrightness(Number(ib))
  });
  //////////////////////////  new   //////////////////////
  decreaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib = document.getElementById("ib1").value
    decreaseBrightness(Number(ib))
  });
  increaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib2 = document.getElementById("ib2").value
    var ib3 = document.getElementById("ib3").value
    var ib4 = document.getElementById("ib4").value
    var ib5 = document.getElementById("ib5").value
    
    increaseContrast(Number(ib2),Number(ib3),Number(ib4),Number(ib5))
  });
  decreaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib6 = document.getElementById("ib6").value
    var ib7 = document.getElementById("ib7").value
    var ib8 = document.getElementById("ib8").value
    var ib9 = document.getElementById("ib9").value
    
    decreaseContrast(Number(ib6),Number(ib7),Number(ib8),Number(ib9))
  });
  InverseForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    Inverse()
  });
  //Write your code here for EventListeners for the other forms using the constants you will create in the transform function


  //Applies pixel-wise transformations to increase brightness
  function increaseBrightness(ib) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] + ib;
      if (val > 255) {
        val = 255;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }

  /////////////////////////////////         ////////////////////////////
  function decreaseBrightness(ib) {
    console.log(getequation(1,5,3,8).slope);
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] - ib;
      if (val < 0) {
        val = 0;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }
  function increaseContrast(ib2,ib3,ib4,ib5) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

 
    let slope1 =  getequation(0,ib2,0,ib4).slope;
    let constant1 =  getequation(0,ib2,0,ib4).constant;
    let slope2 =getequation(ib3,255,ib5,255).slope;
    let constant2 = getequation(ib3,255,ib5,255).constant;
    let slope3 =     getequation(ib2,ib3,ib4,ib5).slope;
    let constant3 =    getequation(ib2,ib3,ib4,ib5).constant;
  

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      if(rgba[i] <= ib2){
        
        
        val=Math.floor(rgba[i]*slope1 +constant1);

      }
      else if(rgba[i] >= ib3){
        
        val=Math.floor(rgba[i]*slope2 +constant2);

      }
      else{
        
        val=Math.floor(rgba[i]*slope3 +constant3);

      }
     /* if(rgba[i] < 128 ){
        val = rgba[i] - ib;
        if (val < 0) {
          val = 0;
        }
      }else{ if(rgba[i] > 128 ){
      val = rgba[i] + ib;
      if (val > 255) {
        val = 255;
      }
    }
    }*/
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }
  function decreaseContrast(ib6,ib7,ib8,ib9) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;


    let slope1 =  getequation(0,ib6,0,ib8).slope;
    let constant1 =  getequation(0,ib6,0,ib8).constant;
    let slope2 =getequation(ib7,255,ib9,255).slope;
    let constant2 = getequation(ib7,255,ib9,255).constant;
    let slope3 =     getequation(ib6,ib7,ib8,ib9).slope;
    let constant3 =    getequation(ib6,ib7,ib8,ib9).constant;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);
    

        for (i = 0; i < img.width * img.height * 4; i += 4) {
          if(rgba[i] <= ib6){
            
            
            val=Math.floor(rgba[i]*slope1 +constant1);
    
          }
          else if(rgba[i] >= ib7){
            
            val=Math.floor(rgba[i]*slope2 +constant2);
    
          }
          else{
            
            val=Math.floor(rgba[i]*slope3 +constant3);
    
          }

      /*if(rgba[i] > 128 ){
        val = rgba[i] - ib;
        if (val < 0) {
          val = 0;
        }
      }else{ if(rgba[i] < 128 ){
      val = rgba[i] + ib;
      if (val > 255) {
        val = 255;
      }
    }
    }*/
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }
  function Inverse() {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = 255-rgba[i];
      
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }
  ///////////////////////////////////

  //Write your code here for three more functions for the other transformations



  //Extracts rgba 1D array of all the pixels in the original image
  function getRGBAValues(img, canvas, ctx) {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    var rgba = ctx.getImageData(
      0, 0, img.width, img.height
    ).data;
    return rgba;
  }

  //Displays the transformed image
  function displayResultImage(img, transformedImage, ctx) {
    //Get a pointer to the current location in the image.
    var palette = ctx.getImageData(0, 0, img.width, img.height); //x,y,w,h
    //Wrap your array as a Uint8ClampedArray
    palette.data.set(new Uint8ClampedArray(transformedImage)); // assuming values 0..255, RGBA, pre-mult.
    //Repost the data.
    ctx.putImageData(palette, 0, 0);
    document.getElementById("result").style.display = "initial";
  }
}  