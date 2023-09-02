<?php
// Allow any origin to access this PHP script
header("Access-Control-Allow-Origin: *");

// Allow common HTTP methods (GET, POST, PUT, DELETE, etc.)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow specific headers in requests
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Allow credentials (e.g., cookies) to be included in requests
header("Access-Control-Allow-Credentials: true");

// Set the maximum age (in seconds) for which this CORS policy is valid
header("Access-Control-Max-Age: 3600");

// Specify the content type for the response
header("Content-Type: application/json");

// Create a connection
$conn = mysqli_connect("localhost","root","","API_DATA");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to retrieve menu items
$sql = "SELECT id, name, description, price FROM menu_items";
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