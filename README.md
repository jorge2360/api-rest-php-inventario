# API REST PHP + MySQL - Inventario 

## Descripción

API REST desarrollada para la gestión de inventario, categorías y productos, implementando operaciones CRUD y control de stock mediante PHP y MySQL.

## Tecnologías utilizadas

- PHP
- MySQL
- PDO
- GitHub
- Postman

## Funcionalidades

### Categorías
- Listar categorías
- Crear categorías
- Obtener categoría por id
- Actualizar categorías
- Eliminar categorías

### Productos
- Listar productos
- Crear productos
- Obtener producto por ID
- Actualizar productos
- Eliminar productos
- Actualizar stock de productos

## Estructura del proyecto

api-rest-php-mysql-inventario/
├── config/
│   └── database.php
├── controllers/
│   ├── categoriaController.php
│   └── productoController.php
├── database/
│   └── script.sql
├── routes/
│   └── api.php
├── utils/
│   └── response.php
├── index.php
├── README.md
└── .gitignore

## Requisitos

Antes de ejecutar el proyecto se debe tener instalado:

- PHP 8 o superior
- MySQL
- XAMPP
- Git
- Postman (opcional para pruebas)

## Base de datos

Ejecutar el archivo:

database/script.sql

El script crea automáticamente:

- Base de datos inventario_jr
- Tabla categoria
- Tabla producto

## Ejecutar el proyecto

1. Iniciar Apache y MySQL desde XAMPP.

2. Ejecutar el script SQL:

3. Levantar el servidor PHP: mysql -u root < "RUTA_COMPLETA\database\script.sql"

4. Abrir en navegador: http://localhost:8000

## Endpoints

## Categorías
Método	    Endpoint	                    Descripción
GET	       /categorias	            Lista todas las categorías
POST	   /categorias	            Crea una categoría
GET	       /categorias/{id}	        Obtiene una categoría por ID
PUT	       /categorias/{id}	        Actualiza una categoría
DELETE	   /categorias/{id}	        Elimina una categoría

## Productos
Método	    Endpoint	                    Descripción
GET	       /productos	            Lista todos los productos
POST	   /productos	            Crea un producto
GET	       /productos/{id}	        Obtiene un producto por ID
PUT	       /productos/{id}	        Actualiza un producto
DELETE	   /productos/{id}	        Elimina un producto
PATCH	   /productos/{id}/stock	Actualiza únicamente el stock de un producto

## Frontend

El proyecto incluye un frontend desarrollado con React y Tailwind CSS para consumir la API REST.

### Tecnologías del frontend

- React
- Vite
- Tailwind CSS
- JavaScript

### Ejecutar frontend

Ingresar a la carpeta 'frontend':

cd frontend

Instalar dependencias:

npm install

Ejecutar servidor de desarrollo:

npm run dev

Abrir en navegador: http://localhost:5173

## Funcionalidades del frontend

- Listado de categorías
-Creación, edición y eliminación de categorías
- Listado de productos
- Creación, edición y eliminación de productos
- Actualización rápida de stock