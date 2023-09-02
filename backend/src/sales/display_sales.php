<?php
// Create a connection
$conn = mysqli_connect("localhost","root","","API_DATA");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to retrieve menu items
$sql = "SELECT id, sale_date, item_name, quantity, unit_price, total_price, payment_method FROM employees";
$result = $conn->query($sql);

// Check if there are any results
if ($result->num_rows > 0) {
    // Initialize an empty array to store menu items
    $menu = array();

    // Fetch and add each menu item to the array
    while ($row = $result->fetch_assoc()) {
        $menu[] = $row;
    }

    // Close the database connection
    $conn->close();

    // Convert the menu array to JSON
    $json_menu = json_encode($menu);

    // Output the JSON data
    header('Content-Type: application/json');
    echo $json_menu;
} else {
    // If there are no menu items, return an empty JSON array
    echo json_encode(array());
}
?>