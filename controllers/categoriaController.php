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
}