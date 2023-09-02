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
        isset($data->id) &&
        isset($data->item_name) &&
        isset($data->category) &&
        isset($data->quantity) &&
        isset($data->unit_of_measure) &&
        isset($data->purchase_price) &&
        isset($data->expiration_date)
    )
        // Assign data to variables
        $id = $data->id;
        $item_name = $data->item_name;
        $category = $data->category;
        $quantity = $data->quantity;
        $unit_of_measure = $data->unit_of_measure;
        $purchase_price = $data->purchase_price;
        $expiration_date = $data->expiration_date;


    // Create a connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Update the inventory item in the database
    $sql = "INSERT INTO inventory (item_name, category, quantity, unit_of_measure, purchase_price, expiration_date)
    VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdssd", $item_name, $category, $quantity, $unit_of_measure, $purchase_price, $expiration_date);
    //s stands for string d stands for double and i stands for integer

    if ($stmt->execute()) {
        // Successfully updated
        echo "Inventory item updated successfully.";
    } else {
        // Error occurred
        echo "Error updating inventory item: " . $stmt->error;
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>
