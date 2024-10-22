<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $producto = $_POST['producto'];
    $cantidadDf = $_POST['CantidadDf'];
    $cantidadEf = $_POST['CantidadEf'];
    $tamaño = $_POST['tamaño'];
    $empleado = $_POST['empleado'];
    $ci = $_POST['ci'];
    $codigoMaquina = $_POST['codigoMaquina'];
    $fecha = date('Y-m-d H:i:s'); // Fecha y hora actual

    // Datos a escribir en el archivo
    $data = "Producto: $producto - Cantidad defectuosa: $cantidadDf - Cantidad efectiva: $cantidadEf - Tamaño: $tamaño - Empleado: $empleado - Fecha: $fecha\n";

    // Ruta y nombre del archivo de texto
    $archivo = 'produccion.txt';

    // Abre o crea el archivo en modo append
    $file = fopen($archivo, 'a');

    if ($file) {
        // Escribe los datos en el archivo
        fwrite($file, $data);
        fclose($file);
        echo "Datos de producción guardados correctamente.";
    } else {
        echo "Error al abrir el archivo.";
    }
}
?>
