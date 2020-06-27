var express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var path = require('path');
var app = express();
var formidable = require('formidable');
var session = require('express-session');

var fs = require('fs');//file system
var crypto = require('crypto')

// pentru folosirea ejs-ului
app.set('view engine', 'ejs');
var path = require('path');
app.use(express.static(path.join(__dirname, 'Resources')));

app.use(session(
	{
		secret:"cheie_sesiune",
		resave: true,
		saveUninitialized:false
	}
));

app.get('/', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */

		// cond? val_if : val_else
		var usrn=req.session ? (req.session.utilizator? req.session.utilizator.username : null) : null;
    res.render('html/index', {username: usrn});
});

app.post('/mesaj', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var textJson=fs.readFileSync("Resources/Scripts/JSON/comments.json","utf8");
		var obJson=JSON.parse(textJson);
		obJson.comments[fields.id].nr_upvotes = fields.nrupv;
		obJson.comments[fields.id].nr_downvotes = fields.nrdownv;
		var jsonNou=JSON.stringify(obJson);
		fs.writeFileSync("Resources/Scripts/JSON/comments.json",jsonNou);
  });
});

app.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect("/");
});

app.get("/*", function(req, res){
  var usrn=req.session ? (req.session.utilizator? req.session.utilizator.username : null) : null;
  	res.render('html/'+req.url, {username: usrn}, function(err, rezultatRender){
  		if (err) {
  			if (err.message.includes("Failed to lookup view"))
          res.status(404).render("html/404", {username: usrn});
        else {
          throw err;
        }

  		}
  		else res.send(rezultatRender)

  	});
});

app.post('/addComment',function(req,res) {
  var dateForm=new formidable.IncomingForm()
	dateForm.parse(req, function(err, fields, files){
		var textJson=fs.readFileSync("Resources/Scripts/JSON/comments.json","utf8");
		var obJson=JSON.parse(textJson);
		var commNou={
			id: obJson.lastId,
			name: fields.name,
			description: fields.comment,
			nr_upvotes: "0",
			nr_downvotes: "0",
			upvoters: "",
			downvoters: ""
		}
		res.redirect("Comentarii");
		obJson.comments.push(commNou);
		obJson.lastId+=1;
		var jsonNou=JSON.stringify(obJson);
		fs.writeFileSync("Resources/Scripts/JSON/comments.json",jsonNou);
	})
})

app.post('/login',function(req,res) {
  var dateForm=new formidable.IncomingForm()
	dateForm.parse(req, function(err, fields, files){
		var textJson=fs.readFileSync("Resources/Scripts/JSON/users.json","utf8");
		var obJson=JSON.parse(textJson);
		var parolaCriptata;
		var algoritmCriptare=crypto.createCipher("aes-128-cbc", "cheie_criptare")
		parolaCriptata=algoritmCriptare.update(fields.pass, "utf-8","hex");
		parolaCriptata+=algoritmCriptare.final("hex");
    var user= obJson.users.find(function(elem){
			return elem.username == fields.username &&  elem.parola==parolaCriptata
		})
		if(user){
			console.log("Exista utilizatorul")
			req.session.utilizator=user;
			res.render('html/index', {username: fields.username});
		}
	})
})

app.post('/register',function(req,res) {
  var dateForm=new formidable.IncomingForm()
	dateForm.parse(req, function(err, fields, files){
		var textJson=fs.readFileSync("Resources/Scripts/JSON/users.json","utf8");
		var obJson=JSON.parse(textJson);
		var parolaCriptata;
		var algoritmCriptare=crypto.createCipher("aes-128-cbc", "cheie_criptare")
		parolaCriptata=algoritmCriptare.update(fields.pass, "utf-8","hex");
		parolaCriptata+=algoritmCriptare.final("hex");

    var today = new Date();
    console.log(today);
		var userNou={
      id: obJson.lastId,
      role: "user",
      username: fields.username,
      nume: fields.fname,
      email: fields.email,
      parola: parolaCriptata,
      dataInreg: today,
      boli: fields.diseases,
      field2: fields.field
    }

		obJson.users.push(userNou);
		obJson.lastId+=1;
		var jsonNou=JSON.stringify(obJson);
		fs.writeFileSync("Resources/Scripts/JSON/users.json",jsonNou);
    res.redirect("/");
	})
})


app.listen(8080);
console.log('Aplicatia se va deschide pe portul 8080.');
