<?php

require_once __DIR__ . '/../controllers/categoriaController.php';
require_once __DIR__ . '/../controllers/productoController.php';

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

if ($uri === '/categorias' && $method === 'GET') {
    $controller = new CategoriaController($connection);
    $controller->index();
}

if ($uri === '/categorias' && $method === 'POST') {
    $controller = new CategoriaController($connection);
    $controller->store();
}

if (preg_match('#^/categorias/(\d+)$#', $uri, $matches) && $method === 'GET') {
    $controller = new CategoriaController($connection);
    $controller->show((int) $matches[1]);
}

if (preg_match('#^/categorias/(\d+)$#', $uri, $matches) && $method === 'PUT') {
    $controller = new CategoriaController($connection);
    $controller->update((int) $matches[1]);
}
if (preg_match('#^/categorias/(\d+)$#', $uri, $matches) && $method === 'DELETE') {
    $controller = new CategoriaController($connection);
    $controller->destroy((int) $matches[1]);
}
if ($uri === '/productos' && $method === 'GET') {
    $controller = new ProductoController($connection);
    $controller->index();
}
if ($uri === '/productos' && $method === 'POST') {
    $controller = new ProductoController($connection);
    $controller->store();
}
if (preg_match('#^/productos/(\d+)$#', $uri, $matches) && $method === 'GET') {
    $controller = new ProductoController($connection);
    $controller->show((int) $matches[1]);
}

jsonResponse(404, [
    'success' => false,
    'message' => 'Ruta no encontrada.'
]);