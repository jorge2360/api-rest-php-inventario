<?php

require_once __DIR__ . '/../utils/response.php';

class ProductoController
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function index(): void
    {
        try {
            $sql = "SELECT 
                        p.id_producto,
                        p.nombre,
                        p.descripcion,
                        p.precio,
                        p.stock,
                        p.created_at,
                        p.updated_at,
                        c.id_categoria,
                        c.nombre AS categoria
                    FROM producto p
                    INNER JOIN categoria c 
                        ON p.id_categoria = c.id_categoria
                    ORDER BY p.id_producto DESC";

            $stmt = $this->connection->query($sql);

            jsonResponse(200, [
                'success' => true,
                'data' => $stmt->fetchAll()
            ]);
        } catch (PDOException $e) {
            jsonResponse(500, [
                'success' => false,
                'message' => 'Error al obtener los productos.'
            ]);
        }
    }
    public function store(): void
    {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            if (!$input) {
                jsonResponse(400, [
                    'success' => false,
                    'message' => 'No se recibieron datos válidos.'
                ]);
            }

            $idCategoria = (int) ($input['id_categoria'] ?? 0);
            $nombre = trim($input['nombre'] ?? '');
            $descripcion = trim($input['descripcion'] ?? '');
            $precio = (float) ($input['precio'] ?? 0);
            $stock = (int) ($input['stock'] ?? 0);

            if ($idCategoria <= 0 || $nombre === '' || $precio <= 0 || $stock < 0) {
                jsonResponse(422, [
                    'success' => false,
                    'message' => 'Los campos id_categoria, nombre, precio y stock son obligatorios.'
                ]);
            }

            $checkSql = "SELECT id_categoria FROM categoria WHERE id_categoria = :id LIMIT 1";
            $checkStmt = $this->connection->prepare($checkSql);
            $checkStmt->execute([':id' => $idCategoria]);

            if (!$checkStmt->fetch()) {
                jsonResponse(404, [
                    'success' => false,
                    'message' => 'Categoría no encontrada.'
                ]);
            }

            $sql = "INSERT INTO producto (id_categoria, nombre, descripcion, precio, stock)
                    VALUES (:id_categoria, :nombre, :descripcion, :precio, :stock)";

            $stmt = $this->connection->prepare($sql);
            $stmt->execute([
                ':id_categoria' => $idCategoria,
                ':nombre' => $nombre,
                ':descripcion' => $descripcion,
                ':precio' => $precio,
                ':stock' => $stock
            ]);

            jsonResponse(201, [
                'success' => true,
                'message' => 'Producto creado correctamente.'
            ]);
        } catch (PDOException $e) {
            jsonResponse(500, [
                'success' => false,
                'message' => 'Error al crear el producto.'
            ]);
        }
    }
    public function show(int $id): void
    {
        try {
            $sql = "SELECT 
                        p.id_producto,
                        p.nombre,
                        p.descripcion,
                        p.precio,
                        p.stock,
                        p.created_at,
                        p.updated_at,
                        c.id_categoria,
                        c.nombre AS categoria
                    FROM producto p
                    INNER JOIN categoria c 
                        ON p.id_categoria = c.id_categoria
                    WHERE p.id_producto = :id
                    LIMIT 1";

            $stmt = $this->connection->prepare($sql);
            $stmt->execute([':id' => $id]);

            $producto = $stmt->fetch();

            if (!$producto) {
                jsonResponse(404, [
                    'success' => false,
                    'message' => 'Producto no encontrado.'
                ]);
            }

            jsonResponse(200, [
                'success' => true,
                'data' => $producto
            ]);
        } catch (PDOException $e) {
            jsonResponse(500, [
                'success' => false,
                'message' => 'Error al obtener el producto.'
            ]);
        }
    }
}