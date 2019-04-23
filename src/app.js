//Requires
require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Paths
const directoriopublico = path.join(__dirname, '../public');
const dirNode_modules = path.join(__dirname, '../node_modules');
//### Para usar las variables de sesión
const session = require('express-session');
var MemoryStore = require('memorystore')(session);

if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch');
}
//Static
app.use(express.static(directoriopublico));
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
app.set('view engine', 'hbs');

const { Usuarios } = require('./chat/usuarios');
const usuarios = new Usuarios();

io.on('connection', client => {

	console.log("un usuario se ha conectado");

	// client.emit("mensaje", "Bienvenido a mi página")

	// client.on("mensaje", (informacion) =>{
	// console.log(informacion)
	// })

	// client.on("contador", () =>{
	// 	contador ++
	// 	console.log(contador)
	// 	io.emit("contador", contador )
	// })

	client.on('usuarioNuevo', (usuario) =>{
		let listado = usuarios.agregarUsuario(client.id, usuario)
		console.log(listado)
		let texto = `Se ha conectado ${usuario}`
		io.emit('nuevoUsuario', texto )
	})

	client.on('disconnect',()=>{
		let usuarioBorrado = usuarios.borrarUsuario(client.id)
		let texto = `Se ha desconectado ${usuarioBorrado.nombre}`
		io.emit('usuarioDesconectado', texto)
			})

	client.on("texto", (text, callback) =>{
		let usuario = usuarios.getUsuario(client.id)
		let texto = `${usuario.nombre} : ${text}`
		
		io.emit("texto", (texto))
		callback()
	})

	client.on("textoPrivado", (text, callback) =>{
		let usuario = usuarios.getUsuario(client.id)
		let texto = `${usuario.nombre} : ${text.mensajePrivado}`
		let destinatario = usuarios.getDestinatario(text.destinatario)
		client.broadcast.to(destinatario.id).emit("textoPrivado", (texto))
		callback()
	})
	
});

//### Para usar las variables de sesión
app.use(session({
	cookie: { maxAge: 86400000 },
 	store: new MemoryStore({
      	checkPeriod: 86400000 // prune expired entries every 24h
    	}),
  	secret: 'keyboard cat',
  	resave: true,
  	saveUninitialized: true
}));

app.use((req, res, next) =>{
	if(req.session.usuario){		
		res.locals.sesion = true
		res.locals.nombre = req.session.nombre
		res.locals.rolAspirante = req.session.rolAspirante
	}	
	next()
});

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {useNewUrlParser: true}, (err, resultado) => {
	if (err){
		return console.log(error)
	}
	console.log("conectado")
});

server.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ' + process.env.PORT);
});