<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $materiaPrima = $_POST['materiaPrima'];
    $tipo = $_POST['tipo'];
    $cantidadMP = $_POST['cantidadMP'];
    $proveedor = $_POST['proveedor'];
    $fecha = date('Y-m-d H:i:s'); // Fecha y hora actual

    // Calcular la fecha límite (30 días después de la fecha de ingreso)
    $fechaLimite = date('Y-m-d H:i:s', strtotime($fecha . ' + 30 days'));

    // Datos a escribir en el archivo
    $data = "$materiaPrima,$tipo,$cantidadMP,$proveedor,$fecha,$fechaLimite\n";

    // Ruta y nombre del archivo de texto
    $archivo = 'materias_primas.txt';

    // Abre o crea el archivo en modo append
    $file = fopen($archivo, 'a');

    if ($file) {
        // Escribe los datos en el archivo
        fwrite($file, $data);
        fclose($file);
        echo "Datos de materias primas guardados correctamente.";
    } else {
        echo "Error al abrir el archivo.";
    }
}
?>
