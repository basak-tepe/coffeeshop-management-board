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
        isset($data->sale_date) &&
        isset($data->item_name) &&
        isset($data->quantity) &&
        isset($data->unit_price) &&
        isset($data->total_price) &&
        isset($data->payment_method)
    ) {
        // Assign data to variables
        $sale_date = $data->sale_date;
        $item_name = $data->item_name;
        $quantity = $data->quantity;
        $unit_price = $data->unit_price;
        $total_price = $data->total_price;
        $payment_method = $data->payment_method;

        // Create a connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Insert the new sale record into the database
        $sql = "INSERT INTO sales (sale_date, item_name, quantity, unit_price, total_price, payment_method)
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssddds", $sale_date, $item_name, $quantity, $unit_price, $total_price, $payment_method);

        if ($stmt->execute()) {
            // Successfully created
            echo "Sale created successfully.";
        } else {
            // Error occurred
            echo "Error creating sale: " . $stmt->error;
        }

        // Close the database connection
        $stmt->close();
        $conn->close();
    } else {
        // Return an error message if JSON data doesn't contain expected keys
        echo "Invalid JSON data. Expected keys are missing.";
    }
}
?>
