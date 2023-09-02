<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Database connection settings
    $servername = "localhost";
    $username = "root"; // Replace with your database username
    $password = "";     // Replace with your database password
    $dbname = "API_DATA"; // Replace with your database name

    // Get the data from the POST request
    $item_id = $_POST['item_id'];
    $new_item_name = $_POST['new_item_name'];
    $new_category = $_POST['new_category'];
    $new_quantity = $_POST['new_quantity'];
    $new_unit_of_measure = $_POST['new_unit_of_measure'];
    $new_purchase_price = $_POST['new_purchase_price'];
    $new_expiration_date = $_POST['new_expiration_date'];

    // Create a connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Update the inventory item in the database
    $sql = "UPDATE menu_items 
            SET item_name = ?, category = ?, quantity = ?, unit_of_measure = ?, purchase_price = ?, expiration_date = ?
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdssdi", $new_item_name, $new_category, $new_quantity, $new_unit_of_measure, $new_purchase_price, $new_expiration_date, $item_id);

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
