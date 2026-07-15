const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.get("/mensaje", (req, res) => {
  res.send("Mensaje express" );
});

app.get("/pagina", (req, res) => {
    const nombre = "Victor Armando Camacho Correa";
  res.send(`
        <style>
            .p1 {
                color: blue;
                background-color: red;
            }
        </style>
        <h1>Mi primera página con express</h1>
        <p class="p1">Creada con Express</p>
        <p>Mi nombre es: ${nombre}</p>
    `);
});

app.get("/alumnos", (req, res) => {
    res.json(
        { nombre: "Victor", edad: 22,carrera: "ISC" },
    );
});

app.get("/materias ", (req, res) => {
    res.json([
        { materia: "NoSQL", Hora: "08:00 - 11:00" },
        { materia: "Web", Hora: "14:00 - 17:00" }
    ]
        
    );
});

app.get("/mensaje/:nombre", (req, res) => {
    res.send(`¡Hola, ${req.params.nombre}`);
});

app.get("/suma/:a/:b", (req, res) => { 
    const a= Number(req.params.a);
    const b= Number(req.params.b);
    res.send(`Resultado: ${a + b}`);
 });

app.get("/multiplicacion/:a/:b", (req, res) => {
    const a= Number(req.params.a);
    const b= Number(req.params.b);
    res.send(`Resultado: ${a * b}`);
});

app.get("/aleatorio", (req, res) => {
    const numero= Math.floor(Math.random() * 100) + 1;
    res.send(`Número aleatorio: ${numero}`);
});

app.listen(port, () => {
  console.log("Servidor iniciado en http://localhost:" + port);
});

