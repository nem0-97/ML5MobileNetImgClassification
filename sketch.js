let mobilenet=ml5.imageClassifier('MobileNet',()=>console.log('model ready'));

function makePrediction(imgFiles){
  //if(mobilenet.modelLoaded){
    //it has already called the modelLoaded callback above but mobilenet.modelLoaded returns false still, idk why
    //clearing previous results(images and paragraphs)
    let imgs=document.getElementsByTagName('body')[0].getElementsByTagName('img');
    for(let i=0;i<imgs.length;i++){
      document.getElementsByTagName('body')[0].removeChild(imgs[i]);
    }
    let paras=document.getElementsByTagName('body')[0].getElementsByTagName('p');
    for(let i=0;i<paras.length;i++){
      document.getElementsByTagName('body')[0].removeChild(paras[i]);
    }
    console.log(paras);
    console.log(imgs);
    for(let i=0;i<imgFiles.length;i++){
      let img=new Image(400,400);
      let reader = new FileReader();
      reader.onload = function(){
        img.src = reader.result;
        mobilenet.predict(img,classified);
        document.getElementsByTagName('body')[0].appendChild(img);
      }
      reader.readAsDataURL(imgFiles[i]);
    }
  /*}
  else{
    console.log('model not ready yet');
  }*/
}

function classified(error,prediction){
  if(error){
    console.log(error);
  }
  else{
    let results = document.createElement('p');
    for(let i=0;i<prediction.length;i++){
      let guess = document.createTextNode((i+1)+') '+prediction[i].className+': '+prediction[i].probability);
      results.appendChild(document.createElement('br'));
      results.appendChild(guess);
    }
    results.appendChild(document.createElement('br'));
    document.getElementsByTagName('body')[0].appendChild(results);
  }
}
