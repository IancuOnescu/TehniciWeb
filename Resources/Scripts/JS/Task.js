window.onload = function(){
  function Task2(){
    var pannel1 = document.getElementById("pannel1");
    var pannel2 = document.getElementById("pannel2");
    var content1 = Array.from(pannel1.children)
    var content2 = Array.from(pannel2.children);
    pannel1.innerHTML = "";
    pannel2.innerHTML = "";

    var i=0;
    var Timer = function Time(){
      var div = document.createElement(content1[i].nodeName);
      pannel1.appendChild(div);
      words = content1[i].innerHTML.split(' ');
      counter = 0;
      var timer = function time(){
        div.innerHTML += words[counter];
        div.innerHTML += " ";
        counter++;
        if(counter < words.length)
          window.setTimeout(time, 333);
      }
      timer();
      i++;
      if(i<content1.length)
        window.setTimeout(Time, words.length*333);
    }
    Timer();

    var j=0
    var Timer2 = function Time2(){
      var div2 = document.createElement(content2[j].nodeName);
      pannel2.appendChild(div2);
      words2 = content2[j].innerHTML.split(' ');
      counter2 = 0;
      var timer2 = function time2(){
        div2.innerHTML += words2[counter2];
        div2.innerHTML += " ";
        counter2++;
        if(counter2 < words2.length)
          window.setTimeout(time2, 333);
      }
      timer2();
      j++;
      if(j<content2.length)
        window.setTimeout(Time2, words2.length*333);
    }
    Timer2();
  }
  Task2();
}
