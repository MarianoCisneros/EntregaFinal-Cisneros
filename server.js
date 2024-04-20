const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.static('public'));

// recordar probar con db tmb
let alumnos = [];

// endpoints falopas para practicar
app.get('/alumnos', (req, res) => {
    res.json(alumnos);
});

app.post('/agregar-alumno', (req, res) => {
    const { nombre, edad, curso } = req.body;
    const alumno = { nombre, edad, curso };
    alumnos.push(alumno);
    res.json({ mensaje: 'Alumno agregado', alumno });
});

app.get('/buscar-por-nombre', (req, res) => {
    const { nombre } = req.query;
    const resultados = alumnos.filter(alumno => alumno.nombre.toLowerCase() === nombre.toLowerCase());
    res.json(resultados);
});

app.get('/buscar-por-curso', (req, res) => {
    const { curso } = req.query;
    const resultados = alumnos.filter(alumno => alumno.curso.toLowerCase() === curso.toLowerCase());
    res.json(resultados);
});

app.delete('/eliminar-alumno', (req, res) => {
    const { nombre } = req.body;
    alumnos = alumnos.filter(alumno => alumno.nombre.toLowerCase() !== nombre.toLowerCase());
    res.json({ mensaje: 'Alumno eliminado' });
});

// inicio sv
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
