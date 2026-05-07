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
}