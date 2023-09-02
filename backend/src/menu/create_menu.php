<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Database connection settings
    $servername = "localhost";
    $username = "root"; // Replace with your database username
    $password = "";     // Replace with your database password
    $dbname = "API_DATA"; // Replace with your database name

    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    // Check if the JSON data contains the expected keys
    if (
        isset($data->name) &&
        isset($data->description) &&
        isset($data->price)
    )

            // Assign data to variables
            $name = $data->name;
            $description = $data->description;
            $price = $data->price;


    // Create a connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Update the employee information in the database
    $sql = "INSERT INTO  menu_items (name, description, price)
    VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssd", $name, $description, $price);

    if ($stmt->execute()) {
        // Successfully updated
        echo "Menu information updated successfully.";
    } else {
        // Error occurred
        echo "Error updating menu information: " . $stmt->error;
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>
