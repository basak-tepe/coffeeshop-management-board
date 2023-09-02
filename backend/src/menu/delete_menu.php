<?php
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Database connection settings
    $servername = "localhost";
    $username = "root"; // Replace with your database username
    $password = "";     // Replace with your database password
    $dbname = "API_DATA"; // Replace with your database name

    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    // Check if the JSON data contains the expected key for the sale ID
    if (isset($data->id)) {
        // Assign the sale ID to a variable
        $id = $data->id;

        // Create a connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Delete the sale record from the database
        $sql = "DELETE FROM menu_items WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            // Successfully deleted
            echo "menu item deleted successfully.";
        } else {
            // Error occurred
            echo "Error deleting menu record: " . $stmt->error;
        }

        // Close the database connection
        $stmt->close();
        $conn->close();
    } else {
        // Return an error message if JSON data doesn't contain the expected key
        echo "Invalid JSON data. Expected key 'id' is missing.";
    }
}
?>
