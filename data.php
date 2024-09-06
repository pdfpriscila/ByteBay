<?php
header('Content-Type: application/json');

// Función para leer datos desde un archivo de texto
function leerDatos($archivo) {
    $datos = [];
    if (file_exists($archivo)) {
        $contenido = file_get_contents($archivo);
        $filas = explode("\n", trim($contenido));
        foreach ($filas as $fila) {
            $datos[] = explode(",", $fila);
        }
    }
    return $datos;
}

// Lee los datos de producción y materias primas
$produccion = leerDatos('produccion.txt');
$materiasPrimas = leerDatos('materias_primas.txt');

// Formatea los datos en un arreglo asociativo
$resultado = [
    'produccion' => array_map(function($item) {
        return [
            'producto' => $item[0],
            'cantidad' => $item[1],
            'tamaño' => $item[2],
            'fecha' => $item[3],
        ];
    }, $produccion),
    'materiasPrimas' => array_map(function($item) {
        return [
            'materiaPrima' => $item[0],
            'tipo' => $item[1],
            'cantidad' => $item[2],
            'fecha' => $item[3],
        ];
    }, $materiasPrimas),
];

// Devuelve los datos como JSON
echo json_encode($resultado);
?>
