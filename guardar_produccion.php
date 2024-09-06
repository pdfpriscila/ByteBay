<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $producto = $_POST['producto'];
    $cantidad = $_POST['cantidad'];
    $tamaño = $_POST['tamaño'];
    $fecha = date('Y-m-d H:i:s'); // Fecha y hora actual

    // Datos a escribir en el archivo
    $data = "Producto: $producto - Cantidad: $cantidad - Tamaño: $tamaño - Fecha: $fecha\n";

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
