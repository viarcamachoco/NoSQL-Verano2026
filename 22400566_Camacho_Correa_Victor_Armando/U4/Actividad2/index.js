const express = require('express');
const app = express();
const PORT = 4000;
const morgan = require('morgan');
const mongoose = require('mongoose');
const nombre = "Victor";
app.use(express.json());

app.use(morgan('dev'));

mongoose.connect('mongodb://127.0.0.1:27017/escuela').then(() => {
    console.log("Conectado a la base de datos");
}).catch((error) => {
    console.log("Error al conectar a la base de datos: ", error);
});

const alumnoSchema = new mongoose.Schema({
    nombre: {type: String, required: true, trim: true},
    carrera: {type: String, required: true, trim: true},
    semestre: {type: Number, required: true,min: 1}
},
{
    timestamps: true
}
);

const Alumno = mongoose.model('Alumno', alumnoSchema, 'alumnos');

app.get("/alumnos",async (req,res) =>{
   try{
        const alumnos = await Alumno.find();
        res.json(alumnos);
} catch (error) {
    res.status(500).json({mensaje: "Error interno del servidor", error: error});
}
});

app.get("/alumnos/:id", async (req,res) =>{
    try{
    const id = Number(req.params.id);
    const alumno = await Alumno.findById(id);
    if(!alumno){
        return res.status(404).json({mensaje: "Alumno no encontrado"});
    }
    res.json(alumno);
} catch (error) {
    res.status(500).json({mensaje: "Error interno del servidor", error: error});    
}});

app.post("/alumnos", async (req,res) =>{
    try{
    const {nombre, carrera, semestre} = req.body;
    if(!nombre || !carrera || !semestre){
        return res.status(400).json({mensaje: "Faltan datos del alumno"});
    }
    const nuevoAlumno = new Alumno({
        nombre,
        carrera,
        semestre
    });
    const alumnoGuardado = await nuevoAlumno.save();
    res.json({mensaje: "Alumno registrado correctamente", alumno: nuevoAlumno});
} catch (error) {
    res.status(500).json({mensaje: "Error interno del servidor", error: error});    
}});

app.put("/alumnos/:id", async (req,res) =>{
    try{
    const id = Number(req.params.id);
    const {nombre, carrera, semestre} = req.body;

    if(!nombre || !carrera || !semestre){
        return res.status(400).json({mensaje: "Faltan datos del alumno"});
    }
    const indice = alumnos.findIndex(alumno => alumno.id === id);
    if(indice === -1){
        return res.status(400).json({
            mensaje: "Alumno no encontrado"
        });
    }
    alumnos[indice] = {
        id: id,
        nombre: nombre,
        carrera: carrera,
        semestre: semestre
    }
    const alumnoActualizado = await Alumno.findByIdAndUpdate(id, {
        nombre,
        carrera,
        semestre
    }, {new: true});

    if(!alumnoActualizado){
        return res.status(404).json({mensaje: "Alumno no encontrado"});
    }

    res.json({
        mensaje: "Alumno actualizado correctamente",
        alumno: alumnoActualizado
    });
    } catch (error) {
        res.status(500).json({mensaje: "Error interno del servidor", error: error});
    }
});
    
app.delete("/alumnos/:id", async (req,res) =>{
    try{
    const id = Number(req.params.id);
    const alumnoEliminado = await Alumno.findByIdAndDelete(id);
    if(!alumnoEliminado){
        return res.status(404).json({mensaje: "Alumno no encontrado"});
    }
    res.json({mensaje: "Alumno eliminado correctamente", alumno: alumnoEliminado});
} catch (error) {
    res.status(500).json({mensaje: "Error interno del servidor", error: error});
}
});


app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.get("/mensaje",(req, res) => {
  res.send("Mensaje desde express");
});

app.get("/pagina", (req, res)=>{
    res.send(`
        <style>
            .p1{
                color: red;
                background: blue;
            }
        </style>
            <h1> Mi pagina web</h1>
            <p class="p1">¡Hola ${nombre}!</p>
        `)
});

app.get("/alumno", (req, res) =>{
    res.json({
        nombre: "Victor",
        carrera: "ISC",
        semestre: 8
    })
});

app.get("/materias", (req, res) =>{
    res.json([
        {
            nombre: "NoSQL",
            hora: "8:00-11:00"
        },
        {
            nombre: "Programacion Web",
            hora: "14:00-17:00"
        },
            ])
});

app.get("/mensaje/:nombre", (req, res) =>{
    res.send(`Hola ${req.params.nombre}`)
})

app.get("/suma/:a/:b", (req, res)=>{
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`La suma de ${a} y ${b} es: ${a+b}`);
});

app.get("/multiplicacion/:a/:b", (req, res)=>{
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    res.send(`La multiplicacion de ${a} y ${b} es: ${a*b}`);
});

app.get("/aleatorio", (req, res)=>{
    const numero = Math.floor(Math.random()*100)+1;
    res.send(`Número aleatorio: ${numero}`);
});

app.listen(PORT, () => {
  console.log("Servidor iniciado en: http://localhost:"+PORT);
});