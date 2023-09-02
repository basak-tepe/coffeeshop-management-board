<?php
// Create a connection
$conn = mysqli_connect("localhost", "root", "", "API_DATA");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the required fields are set
    if (isset($_POST["id"]) && isset($_POST["first_name"]) && isset($_POST["last_name"]) && isset($_POST["email"]) && isset($_POST["phone_number"]) && isset($_POST["hire_date"]) && isset($_POST["position"]) && isset($_POST["hourly_wage"])) {
        // Sanitize input data
        $id = mysqli_real_escape_string($conn, $_POST["id"]);
        $first_name = mysqli_real_escape_string($conn, $_POST["first_name"]);
        $last_name = mysqli_real_escape_string($conn, $_POST["last_name"]);
        $email = mysqli_real_escape_string($conn, $_POST["email"]);
        $phone_number = mysqli_real_escape_string($conn, $_POST["phone_number"]);
        $hire_date = mysqli_real_escape_string($conn, $_POST["hire_date"]);
        $position = mysqli_real_escape_string($conn, $_POST["position"]);
        $hourly_wage = mysqli_real_escape_string($conn, $_POST["hourly_wage"]);

        // Update employee information in the database
        $sql = "UPDATE employees SET first_name='$first_name', last_name='$last_name', email='$email', phone_number='$phone_number', hire_date='$hire_date', POSITION='$position', hourly_wage='$hourly_wage' WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            // Return a success message
            echo json_encode(array("message" => "Employee information updated successfully"));
        } else {
            // Return an error message
            echo json_encode(array("message" => "Error updating employee information: " . $conn->error));
        }
    } else {
        // Return an error message if required fields are missing
        echo json_encode(array("message" => "Missing required fields"));
    }
} else {
    // Return an error message for unsupported request method
    echo json_encode(array("message" => "Unsupported request method"));
}

// Close the database connection
$conn->close();
?>
