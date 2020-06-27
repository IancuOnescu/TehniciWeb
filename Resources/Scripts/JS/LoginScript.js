var modal = document.getElementById("myModal");

var btn = document.getElementById("Login");

var span = document.getElementsByClassName("close")[0];

window.onload = function(){
	var incr;
	var seconds = 0;
	var timeOut = setTimeout(function(){
		var div = document.createElement('div');
		div.id = "inactiv";
		div.style.background = "white";
		div.style.position = "fixed";
		div.style.top = "0";
		div.style.left = "0";
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.zIndex = "1000";
		document.body.appendChild(div);
		var par = document.createElement('p');
		par.style.left = "100px";
		par.style.top = "200px";
		par.style.fontSize = "30px";
		div.appendChild(par);
		incr = setInterval(function(){
			seconds += 1;
			par.innerHTML = "Ai fost inactiv timp de " + seconds + " secunde";
		}, 1000);
	}, 30000);

	function bindEventsToSameHandler(element, events, handler) {
    for(var i = 0; i < events.length; i++) {
        element.addEventListener(events[i], handler);
    }
	}

	element = document.body;
	events = ['click', 'dblclick', 'mouseup', 'mousedown', 'mousemove', 'keydown', 'keypress', 'keyup'];
	bindEventsToSameHandler(element, events, function(e) {
		window.clearTimeout(timeOut);
		window.clearInterval(incr);
		div = document.getElementById("inactiv");
		seconds = 3;
		if(div)
			div.remove();
		timeOut = setTimeout(function(){
			var div = document.createElement('div');
			div.id = "inactiv";
			div.style.background = "white";
			div.style.position = "fixed";
			div.style.top = "0";
			div.style.left = "0";
			div.style.width = "100%";
			div.style.height = "100%";
			div.style.zIndex = "1000";
			document.body.appendChild(div);
			var par = document.createElement('p');
			par.style.left = "100px";
			par.style.top = "200px";
			par.style.fontSize = "30px";
			div.appendChild(par);
			incr = setInterval(function(){
				seconds += 1;
				par.innerHTML = "Ai fost inactiv timp de " + seconds + " secunde";
			}, 1000);
		}, 30000);
	});
}

btn.onclick = function() {
  modal.style.display = "block";
  console.log('nice');
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
