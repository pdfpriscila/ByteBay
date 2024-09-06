<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $puesto = $_POST['puesto'];
    $horario = $_POST['horario'];
    $fecha = date('Y-m-d H:i:s'); // Fecha y hora actual

    // Datos a escribir en el archivo
    $data = "Nombre: $nombre - Puesto: $puesto - Horario: $horario - Fecha: $fecha\n";

    // Ruta y nombre del archivo de texto
    $archivo = 'personal.txt';

    // Abre o crea el archivo en modo append
    $file = fopen($archivo, 'a');

    if ($file) {
        // Escribe los datos en el archivo
        fwrite($file, $data);
        fclose($file);
        echo "Datos de personal guardados correctamente.";
    } else {
        echo "Error al abrir el archivo.";
    }
}
?>
