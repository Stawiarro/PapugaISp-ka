<?php
// Dane dostępowe do bazy danych
$host = "localhost";
$dbname = "papuga";
$username = "root";
$password = "";

// Łączenie z bazą danych
try {
    $dsn = "mysql:host=$host;dbname=$dbname";
    $pdo = new PDO($dsn, $username, $password);

    // Ustawienie opcji dla PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    echo "Połączenie z bazą danych udane.";
} catch (PDOException $e) {
    die("Błąd połączenia z bazą danych: " . $e->getMessage());
}

$pdo = null;
?>
