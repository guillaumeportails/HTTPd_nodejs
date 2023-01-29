// Serveur HTTP local, via node.js / Express
// Pour tester localement une arbo web 
//
// Debuter :
//		https://www.geeksforgeeks.org/how-to-create-https-server-with-node-js/
//
// En WSL ou en Windows
//
// + En WSL, le port 80 n'est utilisable qu'en su
//
// Usage Linux / WSL :
// + Installer nodejs, et des paquets :
//   sudo apt install nodejs   # Ou installation du MSI cote Windows
//   npm install express
// + Creer un certificat HTTPS :
//   openssl req -nodes -new -x509 -keyout server.key -out server.cert
//   => server.cert: The self-signed certificate file
//   => server.key: The private key of the certificate
//
// Usage Windows :
// + Installer node.js et npm
// + CLI :
//   - npm install express
//   - run.bat

// Requiring in-built https for creating
// https server
const https = require('https');

// Express for handling GET and POST request
const express = require('express');
//const serveStatic = require('serve-static');   USeless, see express.static

// Requiring file system to use local files
const fs = require('fs');
const path = require('path');

// Parsing the form of body to take
// input from forms
const bodyParser = require('body-parser');

const app = express();

// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuring express to a few hardcoded neighbors
// It's not possible to serve the upper tree ?
app.use(express.static(__dirname + "/SERVED"));
//app.use('hikit', express.static(path.join(__dirname, '/../hikit')));


// Get request for root of the app
app.get('/', function (req, res) {
	console.log('app.get mw root');
	console.log(`  dirname = "${__dirname}"`);
	console.log(`  proto   = "${req.protocol}"`);
	console.log(`  host    = "${req.hostname}"`);
	console.log(`  path    = "${req.path}"`);
	console.log(`  url     = "${req.originalUrl}"`);
	console.log(`  domains = "${req.subdomains}"`);
	// Sending index.html to the browser
	res.sendFile(__dirname + "/index.html");
});
app.get('/favicon.ico', function (req, res) {
	console.log('app.get mw ico');
	console.log(`  dirname = "${__dirname}"`);
	console.log(`  proto   = "${req.protocol}"`);
	console.log(`  host    = "${req.hostname}"`);
	console.log(`  path    = "${req.path}"`);
	console.log(`  url     = "${req.originalUrl}"`);
	console.log(`  domains = "${req.subdomains}"`);
	// Sending index.html to the browser
	res.sendFile(__dirname + "/favicon.ico");
});
app.get('/brosub/', function (req, res) {
	console.log('app.get mw brosub');
	console.log(`  dirname = "${__dirname}"`);
	console.log(`  proto   = "${req.protocol}"`);
	console.log(`  host    = "${req.hostname}"`);
	console.log(`  path    = "${req.path}"`);
	console.log(`  url     = "${req.originalUrl}"`);
	console.log(`  domains = "${req.subdomains}"`);
    // CORS try
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, OPTIONS, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //
    res.sendFile(path.resolve(__dirname + '/brosub/bro.html'));
});

// Post request for getting input from the form
app.post('/mssg', function (req, res) {
	// Logging the form body
	console.log(req.body);
	// Redirecting to the root
	res.redirect("/");
});

// Creating object of key and certificate
// for SSL
const options = {
	key:  fs.readFileSync("server.key"),
	cert: fs.readFileSync("server.cert"),
};

// Creating https server by passing
// options and app object
https.createServer(options, app).listen(443, function (req, res) {
	console.log("Server started at port 443");
	console.log("https://localhost/");
});

