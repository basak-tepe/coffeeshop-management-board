<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Database connection settings
    $servername = "localhost";
    $username = "root"; // Replace with your database username
    $password = "";     // Replace with your database password
    $dbname = "API_DATA"; // Replace with your database name

    // Get the data from the POST request
    $sale_id = $_POST['sale_id'];
    $new_sale_date = $_POST['new_sale_date'];
    $new_item_name = $_POST['new_item_name'];
    $new_quantity = $_POST['new_quantity'];
    $new_unit_price = $_POST['new_unit_price'];
    $new_total_price = $_POST['new_total_price'];
    $new_payment_method = $_POST['new_payment_method'];

    // Create a connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Update the sales information in the database
    $sql = "UPDATE sales 
            SET sale_date = ?, item_name = ?, quantity = ?, unit_price = ?, total_price = ?, payment_method = ?
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdddsi", $new_sale_date, $new_item_name, $new_quantity, $new_unit_price, $new_total_price, $new_payment_method, $sale_id);

    if ($stmt->execute()) {
        // Successfully updated
        echo "Sales information updated successfully.";
    } else {
        // Error occurred
        echo "Error updating sales information: " . $stmt->error;
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>
