<?php

class Database
{
    private string $host = '127.0.0.1';
    private string $db_name = 'inventario_jr';
    private string $username = 'root';
    private string $password = '';
    private string $charset = 'utf8mb4';

    public function connect(): PDO
    {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->db_name};charset={$this->charset}";

            return new PDO($dsn, $this->username, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode([
                'success' => false,
                'message' => 'Error de conexión a la base de datos.'
            ]));
        }
    }
}