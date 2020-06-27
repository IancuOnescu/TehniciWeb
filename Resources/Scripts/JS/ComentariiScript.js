var modal1 = document.getElementById("addComm");

var btn = document.getElementById("addCommBtn");

var span = document.getElementsByClassName("close")[1];

var comentarii;
var obJson;

var rezultat="";

window.onload=function(){

	let ajaxRequest = new XMLHttpRequest();

	ajaxRequest.open("GET", "Scripts/JSON/comments.json", true);
	ajaxRequest.send();

	ajaxRequest.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					obJson = JSON.parse(this.responseText);
					comentarii = obJson.comments.slice();
          afisare(comentarii);
			}
	}

	function afisare(vector) {
			let container=document.getElementById("content-general");

			let textTemplate ="";
			for(let i=0;i<vector.length;i++){
        if(vector[i].nr_downvotes < 3)
  				textTemplate+=ejs.render("<div class='div_aplicatie'>\
  				<p>Nume: <%= comentariu.name %></p>\
  				<p>Mesaj: <%= comentariu.description %></p>\
          <button id='upvote' onclick='raise_number(this, <%= comentariu.id %>)'>+</button>\
          <span color='green'> <%= comentariu.nr_upvotes %></span>\
          <button id='downvote' onclick='lower_number(this, <%= comentariu.id %>)'>-</button>\
          <span color='red'> <%= comentariu.nr_downvotes %></span>\
  				</div>", {comentariu: vector[i]});
			}
			container.innerHTML=textTemplate;
	}
  var afis = document.getElementById("afisComm")
  afis.onclick = function(){
    if(afis.checked == false){
      document.getElementById("content-general").innerHTML="";
    }
    else afisare(comentarii);
  }

	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var colors = ["green", "red", "blue", "purple", "black", "brown"]
	var family = ["sans-serif", "cursive", "Georgia", "system-ui", "Gill Sans"];
	function generateChaptcha(){
			var cap = document.getElementById("captcha-space");
			for(let i=0; i<6; i++){
				var chr = characters[getRandomInt(0, characters.length)];
				rezultat += chr;
				var span = document.createElement('span');
				span.style.position = "absolute";
				span.innerHTML = chr;
				span.style.color = colors[getRandomInt(0, 6)];
				span.style.fontSize = getRandomInt(25, 45) + "px";
				span.style.top = getRandomInt(10, 20) + "px";
				span.style.left = (45*(i+1)) + "px";
				span.style.fontFamily = family[getRandomInt(0, family.length)];
				span.style.transform = "rotate(" + getRandomInt(-50, 50) + "deg)";
				span.style.transform = "skew(" + getRandomInt(-20, 20) + "deg," + getRandomInt(-20, 20) +"deg)";
				cap.appendChild(span);
			}
	}

	document.getElementById("recaptcha").onclick = function(){
		document.getElementById("captcha-space").innerHTML = "";
		rezultat = "";
		generateChaptcha();
	}

	generateChaptcha();

}

function validateForm(e){
	console.log(rezultat);
	var userCap = String(document.getElementById("captcha").value);
	if(userCap.localeCompare(rezultat) != 0){
			e.preventDefault();
			alert('Captcha gresit!');
			document.getElementById("recaptcha").click();
			document.getElementById("captcha").value = "";
	}
}

function raise_number(elem, x){
  if(get_user != "" && !comentarii[x].upvoters.includes(get_user)){
    var parent = elem.parentNode;
    var content = parent.querySelectorAll("span");
		let nr = Number(content[0].innerHTML) + 1;
    content[0].innerHTML = Number(content[0].innerHTML) + 1;
    var jsonNou=JSON.stringify(obJson);
		trimite(x, nr, Number(content[1].innerHTML));
  }
}

function lower_number(elem, x){
  if(get_user != "" && !comentarii[x].downvoters.includes(get_user)){
    var parent = elem.parentNode;
    var content = parent.querySelectorAll("span");
    let nr = Number(content[1].innerHTML) + 1;
    content[1].innerHTML = Number(content[1].innerHTML) + 1;
    if(nr > 3)
      parent.remove();
    trimite(x, Number(content[0].innerHTML), nr);
  }
}

function trimite(x, nrup, nrdown){
var id = x;
var nrupv = nrup;
var nrdownv = nrdown;

var http = new XMLHttpRequest();
var url = '/mesaj';
var params = `id=${id}&nrupv=${nrupv}&nrdownv=${nrdownv}`;
http.open('POST', url, true);


http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
		//alert(http.responseText);
		}
	}
  http.send(params);
}



btn.onclick = function() {
  modal1.style.display = "block";
}

span.onclick = function() {
  modal1.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal1.style.display = "none";
  }
}
