
function agregarAlumno(nombre, edad, curso) {
    axios.post('/agregar-alumno', { nombre, edad, curso })
        .then(() => mostrarAlumnos())
        .catch(error => console.error('Error al agregar alumno:', error));
}

function buscarAlumnoPorNombre(nombre) {
    return axios.get('/buscar-por-nombre', { params: { nombre } })
        .then(response => response.data)
        .catch(error => console.error('Error al buscar por nombre:', error));
}

function buscarAlumnoPorCurso(curso) {
    return axios.get('/buscar-por-curso', { params: { curso } })
        .then(response => response.data)
        .catch(error => console.error('Error al buscar por curso:', error));
}

function eliminarAlumno(nombre) {
    return axios.delete('/eliminar-alumno', { data: { nombre } })
        .then(() => mostrarAlumnos())
        .catch(error => console.error('Error al eliminar alumno:', error));
}

function mostrarAlumnos() {
    axios.get('/alumnos')
        .then(response => {
            const alumnos = response.data;
            let output = '';

            if (alumnos.length > 0) {
                alumnos.forEach((alumno, index) => {
                    output += "<div>";
                    output += "<h3>Alumno " + (index + 1) + "</h3>";
                    output += "<p>Nombre: " + alumno.nombre + "</p>";
                    output += "<p>Edad: " + alumno.edad + "</p>";
                    output += "<p>Curso: " + alumno.curso + "</p>";
                    output += "<button class='btnEliminar' data-nombre='" + alumno.nombre + "'>Eliminar</button>";
                    output += "</div>";
                });

                document.querySelectorAll('.btnEliminar').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const nombre = btn.getAttribute('data-nombre');
                        eliminarAlumno(nombre);
                    });
                });

            } else {
                output = "<p>No hay alumnos.</p>";
            }

            document.getElementById('output').innerHTML = output;
        })
        .catch(error => console.error('Error al mostrar alumnos:', error));
}

document.getElementById("alumnoForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const curso = document.getElementById("curso").value;
    
    agregarAlumno(nombre, edad, curso);
});

document.getElementById("btnBuscarNombre").addEventListener("click", function () {
    const nombre = document.getElementById("buscarNombre").value;

    buscarAlumnoPorNombre(nombre).then(resultados => {
        let output = '';
        if (resultados.length > 0) {
            resultados.forEach(alumno => {
                output += `<div>
                    <h3>Resultado de la Búsqueda por Nombre:</h3>
                    <p>Nombre: ${alumno.nombre}</p>
                    <p>Edad: ${alumno.edad}</p>
                    <p>Curso: ${alumno.curso}</p>
                </div>`;
            });
        } else {
            output = "<p>No se encontró ningún alumno con ese nombre.</p>";
        }
        document.getElementById('output').innerHTML = output;
    });
});

document.getElementById("btnBuscarCurso").addEventListener("click", function () {
    const curso = document.getElementById("buscarCurso").value;

    buscarAlumnoPorCurso(curso).then(resultados => {
        let output = '';
        if (resultados.length > 0) {
            resultados.forEach(alumno => {
                output += `<div>
                    <h3>Resultado de la Búsqueda por Curso:</h3>
                    <p>Nombre: ${alumno.nombre}</p>
                    <p>Edad: ${alumno.edad}</p>
                    <p>Curso: ${alumno.curso}</p>
                </div>`;
            });
        } else {
            output = "<p>No se encontraron alumnos en ese curso.</p>";
        }
        document.getElementById('output').innerHTML = output;
    });
});

document.getElementById("btnMostrarTodos").addEventListener("click", mostrarAlumnos);

mostrarAlumnos();
