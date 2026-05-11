# API REST PHP + MySQL - Inventario

Sistema de inventario full stack desarrollado con PHP, MySQL, React y Tailwind CSS, implementando operaciones CRUD, control de stock y consumo de API REST.

---

## Descripción

Proyecto desarrollado para la gestión de inventario, categorías y productos mediante una arquitectura separada entre backend y frontend.

El sistema permite administrar productos y categorías, actualizar stock, realizar búsquedas dinámicas y visualizar métricas generales mediante un dashboard interactivo.

---

## Tecnologías utilizadas

### Backend
- PHP
- MySQL
- PDO
- API REST

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript

### Herramientas
- Git
- GitHub
- Postman
- XAMPP

---

## Funcionalidades

### Categorías
- Listar categorías
- Crear categorías
- Obtener categoría por ID
- Actualizar categorías
- Eliminar categorías
- Buscar categorías

### Productos
- Listar productos
- Crear productos
- Obtener producto por ID
- Actualizar productos
- Eliminar productos
- Actualizar stock de productos
- Buscar productos
- Indicadores visuales de stock

### Dashboard
- Total de categorías
- Total de productos
- Stock total
- Productos con bajo stock

---

## Estructura del proyecto

```text
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
├── frontend/
│   ├── src/
│   └── package.json
├── index.php
├── README.md
└── .gitignore
```

---

## Requisitos

Antes de ejecutar el proyecto se debe tener instalado:

- PHP 8 o superior
- MySQL
- Node.js
- XAMPP
- Git
- Postman (opcional)

---

## Base de datos

Ejecutar el archivo:

```text
database/script.sql
```

El script crea automáticamente:

- Base de datos `inventario_jr`
- Tabla `categoria`
- Tabla `producto`

---

## Ejecutar backend

Iniciar Apache y MySQL desde XAMPP.

Ejecutar script SQL:

```bash
mysql -u root < "RUTA_COMPLETA\database\script.sql"
```

Levantar servidor PHP:

```bash
php -S localhost:8000 -t .
```

Abrir en navegador:

```text
http://localhost:8000
```

---

## Ejecutar frontend

Ingresar a la carpeta frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar frontend:

```bash
npm run dev
```

Abrir en navegador:

```text
http://localhost:5173
```

---

## Endpoints

### Categorías

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/categorias` | Listar categorías |
| POST | `/categorias` | Crear categoría |
| GET | `/categorias/{id}` | Obtener categoría |
| PUT | `/categorias/{id}` | Actualizar categoría |
| DELETE | `/categorias/{id}` | Eliminar categoría |

### Productos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/productos` | Listar productos |
| POST | `/productos` | Crear producto |
| GET | `/productos/{id}` | Obtener producto |
| PUT | `/productos/{id}` | Actualizar producto |
| DELETE | `/productos/{id}` | Eliminar producto |
| PATCH | `/productos/{id}/stock` | Actualizar stock |

---

## Funcionalidades del frontend

- Dashboard con métricas
- Gestión de categorías
- Gestión de productos
- Actualización rápida de stock
- Búsqueda de categorías y productos
- Indicadores visuales de stock
- Diseño responsive

---

## Buenas prácticas implementadas

- Arquitectura organizada por capas
- Uso de PDO y consultas preparadas
- Separación entre backend y frontend
- Componentes reutilizables en React
- Respuestas JSON estructuradas
- Validaciones básicas de formularios
- Manejo de estados y errores
- Organización modular del frontend

---

## Autor

Jorge García