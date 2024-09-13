<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $puesto = $_POST['puesto'];
    $rol = $_POST['rol'];
    $telefono = $_POST['telefono'];
    $estado = $_POST['estado'];
    $horario = $_POST['horario'];
    $fecha = date('Y-m-d H:i:s');

    $data = "Nombre: $nombre - Puesto: $puesto - Rol: $rol - Teléfono: $telefono - Estado: $estado - Horario: $horario - Fecha: $fecha\n";

    $archivo = 'personal.txt';
    $file = fopen($archivo, 'a');

    if ($file) {
        fwrite($file, $data);
        fclose($file);
        echo "Personal guardado correctamente.";
    } else {
        echo "Error al guardar los datos.";
    }
}
?>
