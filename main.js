document.addEventListener("DOMContentLoaded", function() {
    // Función para verificar y mostrar alerta por posible humedad
    function verificarHumedadMateriasPrimas() {
        const treintaDias = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos
        const hoy = new Date().getTime(); // Fecha actual en milisegundos

        // Obtener todas las filas de la tabla de materias primas
        const filasMateriasPrimas = document.querySelectorAll("#materiasPrimasTable tbody tr");

        filasMateriasPrimas.forEach(fila => {
            const fechaIngreso = new Date(fila.dataset.fecha).getTime(); // Fecha de ingreso en milisegundos
            const fechaLimite = new Date(fila.dataset.fechaLimite).getTime(); // Fecha límite en milisegundos

            // Si han pasado 30 días o más desde la fecha de ingreso, mostrar alerta
            if (hoy >= fechaLimite) {
                console.log(`Alerta: Posible humedad en ${fila.dataset.materiaPrima}`);
                // Aquí puedes implementar una notificación visual o cualquier otra acción
            }
        });
    }

    // Función para obtener y mostrar las materias primas guardadas
    function obtenerMateriasPrimas() {
        fetch("obtener_materias_primas.php")
        .then(response => response.json())
        .then(data => {
            // Limpiar la tabla antes de actualizar
            const tbody = document.querySelector("#materiasPrimasTable tbody");
            tbody.innerHTML = "";

            // Iterar sobre los datos recibidos y agregar filas a la tabla
            data.forEach(materiaPrima => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${materiaPrima.tipo}</td>
                    <td>${materiaPrima.cantidadMP}</td>
                    <td>${materiaPrima.proveedor}</td>
                    <td>${materiaPrima.fecha}</td>
                `;
                // Añadir atributos dataset para la fecha de ingreso y fecha límite
                fila.dataset.fecha = materiaPrima.fecha;
                fila.dataset.fechaLimite = materiaPrima.fechaLimite;
                fila.dataset.materiaPrima = materiaPrima.materiaPrima; // Para la alerta
                tbody.appendChild(fila);
            });

            // Verificar humedad después de actualizar la tabla
            verificarHumedadMateriasPrimas();
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    // Llamar a la función para obtener las materias primas al cargar la página
    obtenerMateriasPrimas();

    // Referencias a los enlaces del menú
    const inicioLink = document.getElementById("inicioLink");
    const gestionProduccionLink = document.getElementById("gestionProduccionLink");
    const gestionMateriasPrimasLink = document.getElementById("gestionMateriasPrimasLink");

    // Referencias a las secciones
    const homeContent = document.getElementById("homeContent");
    const gestionProduccion = document.getElementById("gestionProduccion");
    const gestionMateriasPrimas = document.getElementById("gestionMateriasPrimas");

    // Función para mostrar una sección y ocultar las demás
    function mostrarSeccion(seccion) {
        homeContent.style.display = "none";
        gestionProduccion.style.display = "none";
        gestionMateriasPrimas.style.display = "none";        
        seccion.style.display = "block";
    }

    // Eventos de clic para los enlaces del menú
    inicioLink.addEventListener("click", function(e) {
        e.preventDefault();
        mostrarSeccion(homeContent);
    });

    gestionProduccionLink.addEventListener("click", function(e) {
        e.preventDefault();
        mostrarSeccion(gestionProduccion);
    });

    gestionMateriasPrimasLink.addEventListener("click", function(e) {
        e.preventDefault();
        mostrarSeccion(gestionMateriasPrimas);
    });

    // Gestión de Producción
    const produccionForm = document.getElementById("produccionForm");

    produccionForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Previene el envío del formulario

        const producto = document.getElementById("producto").value;
        const cantidad = document.getElementById("cantidad").value;
        const cantidadDf = document.getElementById("cantidadDf").value;
        const cantidadEf = document.getElementById("cantidadEf").value;
        const tamaño = document.getElementById("tamaño").value;
        const empleado = document.getElementById("empleado").value;
        const ci = document.getElementById("ci").value;
        const codigoMaquina = document.getElementById("codigoMaquina").value;
        const fecha = new Date().toLocaleString(); // Obtiene la fecha y hora actual en formato legible

        fetch('guardar_produccion.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `producto=${encodeURIComponent(producto)}&cantidad=${encodeURIComponent(cantidad)}&cantidadDf=${encodeURIComponent(cantidadDf)}&cantidadEf=${encodeURIComponent(cantidadEf)}&tamaño=${encodeURIComponent(tamaño)}&empleado=${encodeURIComponent(empleado)}&ci=${encodeURIComponent(ci)}&codigoMaquina=${encodeURIComponent(codigoMaquina)}`
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Muestra el mensaje de respuesta del servidor en la consola
            
            // Añadir nueva fila a la tabla en la página principal
            const nuevaFilaPrincipal = document.createElement("tr");
            nuevaFilaPrincipal.innerHTML = `
                <td>${producto}</td>
                <td>${cantidad}</td>
                <td>${cantidadDf}</td>
                <td>${cantidadEf}</td>
                <td>${tamaño}</td>
                <td>${empleado}</td>
                <td>${ci}</td>
                <td>${codigoMaquina}</td>
                <td>${fecha}</td>
            `;
            document.querySelector("#extraProduccionTable tbody").appendChild(nuevaFilaPrincipal);
            
            // Añadir nueva fila a la tabla en la sección de gestión de producción
            const nuevaFilaSeccion = document.createElement("tr");
            nuevaFilaSeccion.innerHTML = `
                <td>${producto}</td>
                <td>${cantidad}</td>
                <td>${cantidadDf}</td>
                <td>${cantidadEf}</td>
                <td>${tamaño}</td>
                <td>${empleado}</td>
                <td>${ci}</td>
                <td>${codigoMaquina}</td>
                <td>${fecha}</td>
            `;
            document.querySelector("#produccionTable tbody").appendChild(nuevaFilaSeccion);
        })
        .catch(error => {
            console.error('Error al guardar los datos:', error);
        });

        produccionForm.reset(); // Reinicia el formulario
    });

    // Gestión de Materias Primas
    const materiasPrimasForm = document.getElementById("materiasPrimasForm");

    materiasPrimasForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Previene el envío del formulario

        const tipo = document.getElementById("tipo").value;
        const cantidadMP = document.getElementById("cantidadMP").value;
        const proveedor = document.getElementById("proveedor").value;
        const fecha = new Date().toLocaleString(); // Obtiene la fecha y hora actual en formato legible

        fetch('guardar_materias_primas.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `tipo=${encodeURIComponent(tipo)}&cantidadMP=${encodeURIComponent(cantidadMP)}&proveedor=${encodeURIComponent(proveedor)}`
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Muestra el mensaje de respuesta del servidor en la consola
            
            // Añadir nueva fila a la tabla en la página principal
            const nuevaFilaPrincipal = document.createElement("tr");
            nuevaFilaPrincipal.innerHTML = `
                <td>${tipo}</td>
                <td>${cantidadMP}</td>
                <td>${proveedor}</td>
                <td>${fecha}</td>
            `;
            document.querySelector("#extraMateriasPrimasTable tbody").appendChild(nuevaFilaPrincipal);
            
            // Añadir nueva fila a la tabla en la sección de gestión de materias primas
            const nuevaFilaSeccion = document.createElement("tr");
            nuevaFilaSeccion.innerHTML = `
                <td>${tipo}</td>
                <td>${cantidadMP}</td>
                <td>${proveedor}</td>
                <td>${fecha}</td>
            `;
            document.querySelector("#materiasPrimasTable tbody").appendChild(nuevaFilaSeccion);
        })
        .catch(error => {
            console.error('Error al guardar los datos:', error);
        });

        materiasPrimasForm.reset(); // Reinicia el formulario
    });

    // Mostrar más en la sección de Inicio (extraContent)
    const toggleContentBtn = document.getElementById("toggleContentBtn");
    const extraContent = document.getElementById("extraContent");

    toggleContentBtn.addEventListener("click", function() {
        if (extraContent.style.display === "none" || extraContent.style.display === "") {
            extraContent.style.display = "block";
            toggleContentBtn.textContent = "Mostrar menos";
        } else {
            extraContent.style.display = "none";
            toggleContentBtn.textContent = "Mostrar más";
        }
    });
});

//ultima version
