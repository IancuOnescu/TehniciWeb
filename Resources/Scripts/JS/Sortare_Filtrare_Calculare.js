
var sum = 0;
var contor = 0;

window.onload=function(){

	var ajaxRequest = new XMLHttpRequest();

	ajaxRequest.open("GET", "Scripts/JSON/entity.json", true);
	ajaxRequest.send();

	ajaxRequest.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					obJson = JSON.parse(this.responseText);
					afisare(obJson.servicii);
					servicii = obJson.servicii.slice();
			}
			contor++;
			if(localStorage.getItem('filtered') == 'true' && contor > 2){
				document.getElementById("filtrareValabile").click();
			}
	}

	function afisare(vector) {
			let container=document.getElementById("content-general");

			let textTemplate ="";
			for(let i=0;i<vector.length;i++){
				textTemplate+=ejs.render("<div class='div_aplicatie' onclick='div_onclick(<%= serviciu.id %>)'>\
				<p>Nume: <%= serviciu.name %></p>\
				<p>Valabil de la data: <%= serviciu.availableFrom %></p>\
        <p>Manager: <%= serviciu.manager %></p>\
        <p>Disponibilitate: <%= serviciu.availability %></p>\
        <p>Descriere: <%= serviciu.descrption %></p>\
        <p>Pret: <%= serviciu.pret %></p>\
				</div>", {serviciu: vector[i]});
			}
			container.innerHTML=textTemplate;
	}

    document.getElementById("sortByName").onclick = function(){
        servicii.sort(function(a, b){
          return String(a.name).localeCompare(String(b.name));
        });
        afisare(servicii);
    }

    document.getElementById("sortByDate").onclick = function(){
      servicii.sort(function(a, b){
        data = a.availableFrom.split('/');
        data_a = new Date(data[2], data[1] - 1, data[0]);
        data = b.availableFrom.split('/');
        data_b = new Date(data[2], data[1] - 1, data[0]);
        return data_a - data_b;
      })
      afisare(servicii);
    }

    document.getElementById("sortByPrice").onclick = function(){
        servicii.sort(function(a, b){
          return a.pret - b.pret;
        });
        afisare(servicii);
    }

    document.getElementById("filtrareValabile").onclick = function(){
			button = document.getElementById("filtrareValabile");
			if(!button.checked){
				for(let i=0; i<obJson.servicii.length; i++)
					if(obJson.servicii[i].availability == "indisponibil")
						servicii.push(obJson.servicii[i]);
				button.checked = false;
				localStorage.setItem('filtered', 'false');
			}
			else{
	      for(let i=0; i<servicii.length; i++)
	        if(servicii[i].availability == "indisponibil"){
	          servicii.splice(i, 1);
	          i--;
	        }
				localStorage.setItem('filtered', 'true');
			}
      afisare(servicii);
    }

    document.getElementById("resetare").onclick = function(){
        servicii = obJson.servicii.slice();
				if(document.getElementById("filtrareValabile").checked)
				 	document.getElementById("filtrareValabile").checked= !document.getElementById("filtrareValabile").checked;
				if(sum != 0)
				document.getElementById("total").remove();
				sum = 0;
        afisare(servicii);
				localStorage.clear();
    }

		document.getElementById("priceInputId").onchange = function(){
			let pret = document.getElementById("priceInputId").value;
			for(let i=0; i<servicii.length; i++)
				if(servicii[i].pret > pret){
					servicii.splice(i, 1);
					i--;
				}
			afisare(servicii);
		}

		window.onkeypress=function(e){
		ultim_chr=String.fromCharCode(e.charCode?e.charCode:e.keyCode);
		console.log(ultim_chr);
		for(let i=0; i<servicii.length; i++)
			if(servicii[i].name[0] != ultim_chr.toUpperCase()){
				servicii.splice(i, 1);
				i--;
			}
		afisare(servicii);
	}

	setInterval(function(){
		let randInt = getRandomInt(0, servicii.length);
		servicii[randInt].pret = Math.round(parseInt(servicii[randInt].pret) * 0.9).toString();
		afisare(servicii);
	}, 3000)

	var timeOut = setTimeout(function(){
   window.location.reload(1);
}, 30000);

	window.onmousemove = function(e){
		window.clearTimeout(timeOut);
		timeOut = setTimeout(function(){
	   window.location.reload(1);
	 }, 30000);
	}

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function div_onclick(i){
		if(sum == 0){
			var para = document.createElement("p");
			para.innerHTML = "Total: ";
			para.id = "total";
			document.getElementById("div_total").appendChild(para);
		}
		sum += Number(obJson.servicii[i].pret);
		document.getElementById("total").innerHTML = "Total: " + String(sum);
		if(sum >= 1000)
			document.getElementById("total").style.color = "red";
}
