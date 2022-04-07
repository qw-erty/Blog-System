

function back(){
  console.log("in back");
  if(start == 0){
    buttonOff()
  }
  else{
    start = start - 10 ;
    end = end - 10;
  }
  
}

function next(){
  console.log("in next");
  if(end == (posts.length - posts.length%10 )){
    buttonOff()
  }
  else{
    start = start - 10 ;
    end = end - 10;
  }
}

function buttonOff() {
 document.getElementById("myBtn").disabled = true;
}
