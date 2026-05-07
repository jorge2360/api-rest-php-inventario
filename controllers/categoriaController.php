<?php

require_once __DIR__ . '/../utils/response.php';

class CategoriaController
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function index(): void
    {
        try {
            $sql = "SELECT * FROM categoria ORDER BY id_categoria DESC";
            $stmt = $this->connection->query($sql);

            jsonResponse(200, [
                'success' => true,
                'data' => $stmt->fetchAll()
            ]);
        } catch (PDOException $e) {
            jsonResponse(500, [
                'success' => false,
                'message' => 'Error al obtener las categorías.'
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

            $nombre = trim($input['nombre'] ?? '');
            $descripcion = trim($input['descripcion'] ?? '');

            if ($nombre === '') {
                jsonResponse(422, [
                    'success' => false,
                    'message' => 'El campo nombre es obligatorio.'
                ]);
            }

            $sql = "INSERT INTO categoria (nombre, descripcion)
                    VALUES (:nombre, :descripcion)";

            $stmt = $this->connection->prepare($sql);
            $stmt->execute([
                ':nombre' => $nombre,
                ':descripcion' => $descripcion
            ]);

            jsonResponse(201, [
                'success' => true,
                'message' => 'Categoría creada correctamente.'
            ]);
        } catch (PDOException $e) {
            jsonResponse(500, [
                'success' => false,
                'message' => 'Error al crear la categoría.'
            ]);
        }
    }
    public function show(int $id): void
    {
        try {
            $sql = "SELECT * FROM categoria WHERE id_categoria = :id LIMIT 1";
            $stmt = $this->connection->prepare($sql);
            $stmt->execute([':id' => $id]);

            $categoria = $stmt->fetch();

            if (!$categoria) {
                jsonResponse(404, [
                    'success' => false,
                    'message' => 'Categoría no encontrada.'
                ]);
            }

            jsonResponse(200, [
                'success' => true,
                'data' => $categoria
            ]);
        } catch (PDOException $e) {
            jsonResponse(500, [
                'success' => false,
                'message' => 'Error al obtener la categoría.'
            ]);
        }
    }
    public function update(int $id): void
    {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            if (!$input) {
                jsonResponse(400, [
                    'success' => false,
                    'message' => 'No se recibieron datos válidos.'
                ]);
            }

            $nombre = trim($input['nombre'] ?? '');
            $descripcion = trim($input['descripcion'] ?? '');

            if ($nombre === '') {
                jsonResponse(422, [
                    'success' => false,
                    'message' => 'El campo nombre es obligatorio.'
                ]);
            }

            $checkSql = "SELECT id_categoria FROM categoria WHERE id_categoria = :id LIMIT 1";
            $checkStmt = $this->connection->prepare($checkSql);
            $checkStmt->execute([':id' => $id]);

            if (!$checkStmt->fetch()) {
                jsonResponse(404, [
                    'success' => false,
                    'message' => 'Categoría no encontrada.'
                ]);
            }

            $sql = "UPDATE categoria
                    SET nombre = :nombre,
                        descripcion = :descripcion
                    WHERE id_categoria = :id";

            $stmt = $this->connection->prepare($sql);
            $stmt->execute([
                ':nombre' => $nombre,
                ':descripcion' => $descripcion,
                ':id' => $id
            ]);

            jsonResponse(200, [
                'success' => true,
                'message' => 'Categoría actualizada correctamente.'
            ]);
        } catch (PDOException $e) {
            jsonResponse(500, [
                'success' => false,
                'message' => 'Error al actualizar la categoría.'
            ]);
        }
    }
    public function destroy(int $id): void
    {
        try {
            $checkSql = "SELECT id_categoria FROM categoria WHERE id_categoria = :id LIMIT 1";
            $checkStmt = $this->connection->prepare($checkSql);
            $checkStmt->execute([':id' => $id]);

            if (!$checkStmt->fetch()) {
                jsonResponse(404, [
                    'success' => false,
                    'message' => 'Categoría no encontrada.'
                ]);
            }

            $sql = "DELETE FROM categoria WHERE id_categoria = :id";
            $stmt = $this->connection->prepare($sql);
            $stmt->execute([':id' => $id]);

            jsonResponse(200, [
                'success' => true,
                'message' => 'Categoría eliminada correctamente.'
            ]);
        } catch (PDOException $e) {
            jsonResponse(500, [
                'success' => false,
                'message' => 'No se puede eliminar la categoría porque tiene productos asociados.'
            ]);
        }
    }
}