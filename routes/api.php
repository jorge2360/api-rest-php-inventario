<?php

$database = new Database();
$connection = $database->connect();

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($uri === '/' && $method === 'GET') {
    jsonResponse(200, [
        'success' => true,
        'message' => 'API de inventario funcionando correctamente.'
    ]);
}

jsonResponse(404, [
    'success' => false,
    'message' => 'Ruta no encontrada.'
]);