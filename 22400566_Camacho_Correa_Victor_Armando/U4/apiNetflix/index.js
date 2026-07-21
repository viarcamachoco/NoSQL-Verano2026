const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = 4000;

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Conexión a MongoDB Atlas (Base de datos: netflix)
mongoose.connect('mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix')
    .then(() => {
        console.log("Conectado a la base de datos 'netflix' en MongoDB Atlas");
    })
    .catch((error) => {
        console.log("Error al conectar a la base de datos: ", error);
    });

// Definición del Esquema y Modelo
const peliculaSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    genero: { type: String, required: true, trim: true },
    anio: { type: Number, required: true, min: 1800 }
}, {
    timestamps: true
});

const Pelicula = mongoose.model('Pelicula', peliculaSchema, 'peliculas');

// ==========================================
// RUTAS CRUD
// ==========================================

// 1. Obtener todas las películas (GET)
app.get("/peliculas", async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error });
    }
});

// 2. Obtener una película por ID (GET)
app.get("/peliculas/:id", async (req, res) => {
    try {
        const id = req.params.id; // En MongoDB los IDs son texto (ObjectId), no usamos Number()
        const pelicula = await Pelicula.findById(id);
        
        if (!pelicula) {
            return res.status(404).json({ mensaje: "Película no encontrada" });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error });
    }
});

// 3. Crear una nueva película (POST)
app.post("/peliculas", async (req, res) => {
    try {
        const { titulo, genero, anio } = req.body;
        
        if (!titulo || !genero || !anio) {
            return res.status(400).json({ mensaje: "Faltan datos de la película" });
        }
        
        const nuevaPelicula = new Pelicula({ titulo, genero, anio });
        const peliculaGuardada = await nuevaPelicula.save();
        
        res.json({ mensaje: "Película registrada correctamente", pelicula: peliculaGuardada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error });
    }
});

// 4. Actualizar una película (PUT)
app.put("/peliculas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, genero, anio } = req.body;

        if (!titulo || !genero || !anio) {
            return res.status(400).json({ mensaje: "Faltan datos de la película" });
        }

        const peliculaActualizada = await Pelicula.findByIdAndUpdate(id, {
            titulo,
            genero,
            anio
        }, { new: true });

        if (!peliculaActualizada) {
            return res.status(404).json({ mensaje: "Película no encontrada" });
        }

        res.json({
            mensaje: "Película actualizada correctamente",
            pelicula: peliculaActualizada
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error });
    }
});

// 5. Eliminar una película (DELETE)
app.delete("/peliculas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const peliculaEliminada = await Pelicula.findByIdAndDelete(id);
        
        if (!peliculaEliminada) {
            return res.status(404).json({ mensaje: "Película no encontrada" });
        }
        
        res.json({ mensaje: "Película eliminada correctamente", pelicula: peliculaEliminada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error });
    }
});

// Ruta de prueba base
app.get('/', (req, res) => {
    res.send('¡API de Netflix funcionando!');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log("Servidor iniciado en: http://localhost:" + PORT);
});