<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Database connection settings
    $servername = "localhost";
    $username = "root"; // Replace with your database username
    $password = "";     // Replace with your database password
    $dbname = "API_DATA"; // Replace with your database name

    // Get the data from the POST request
    $employee_id = $_POST['employee_id'];
    $new_first_name = $_POST['new_first_name'];
    $new_last_name = $_POST['new_last_name'];
    $new_email = $_POST['new_email'];
    $new_phone_number = $_POST['new_phone_number'];
    $new_hire_date = $_POST['new_hire_date'];
    $new_position = $_POST['new_position'];
    $new_hourly_wage = $_POST['new_hourly_wage'];

    // Create a connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Update the employee information in the database
    $sql = "UPDATE employees 
            SET first_name = ?, last_name = ?, email = ?, phone_number = ?, hire_date = ?, POSITION = ?, hourly_wage = ?
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssdi", $new_first_name, $new_last_name, $new_email, $new_phone_number, $new_hire_date, $new_position, $new_hourly_wage, $employee_id);

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
