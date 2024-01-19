<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include_once '../database.php';

    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    try {
        $pdo = connectDatabase();

        // Zabezpieczenie danych przed wstrzykiwaniem SQL
        $name = $pdo->quote($name);
        $email = $pdo->quote($email);
        $subject = $pdo->quote($subject);
        $message = $pdo->quote($message);

        // Przygotowanie zapytania SQL z użyciem prepared statements
        $stmt = $pdo->prepare("INSERT INTO contact (name, email, topic, message) VALUES (:name, :email, :subject, :message)");

        // Przypisanie wartości do parametrów
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':subject', $subject);
        $stmt->bindParam(':message', $message);

        // Wykonanie zapytania
        $stmt->execute();

        // // Ustawienia dla maila
        // $to = $email;
        // $headers = "From: kancelaria-papuga@wp.pl" . "\r\n" .
        //     "Reply-To: kancelaria-papuga@wp.pl" . "\r\n" .
        //     "Content-type: text/html; charset=UTF-8" . "\r\n";

        // // Treść wiadomości
        // $emailContent = "
        //     <html>
        //     <head>
        //         <title>Prośba o kontakt, kancelaria papuga i spółka</title>
        //     </head>
        //     <body>
        //         Dziękujemy za zaufanie <p><strong>Imię:</strong>$name</p>, wkrótce skontaktujemy się z tobą.
        //     </body>
        //     </html>
        // ";

        // // Wysłanie wiadomości e-mail
        // mail($to, $subject, $emailContent, $headers);

        // Jeśli wykonanie zapytania powiodło się
        echo json_encode(array('status' => 'success'));
    } catch (PDOException $e) {
        // Błąd połączenia z bazą danych
        echo json_encode(array('status' => 'error', 'message' => $e->getMessage()));
    } finally {
        // Zamykanie połączenia z bazą danych
        if (isset($pdo)) {
            $pdo = null;
        }
    }
} else {
    // Nieprawidłowe żądanie
    echo json_encode(array('status' => 'error', 'message' => 'Invalid request'));
}
?>
