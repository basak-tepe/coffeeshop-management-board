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
        isset($data->first_name) &&
        isset($data->last_name) &&
        isset($data->email) &&
        isset($data->phone_number) &&
        isset($data->hire_date) &&
        isset($data->POSITION) &&
        isset($data->hourly_wage)
    )

            // Assign data to variables
            $id = $data->id;
            $first_name = $data->first_name;
            $last_name = $data->last_name;
            $email = $data->email;
            $phone_number = $data->phone_number;
            $hire_date = $data->hire_date;
            $POSITION = $data->POSITION;
            $hourly_wage = $data->hourly_wage;


    // Create a connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Update the employee information in the database
    $sql = "INSERT INTO employees (first_name, last_name, email, phone_numbeR, hire_date, POSITION, hourly_wage)
    VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssd", $first_name, $last_name, $email, $phone_number, $hire_date, $POSITION, $hourly_wage);

    if ($stmt->execute()) {
        // Successfully updated
        echo "Employee information updated successfully.";
    } else {
        // Error occurred
        echo "Error updating employee information: " . $stmt->error;
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>
