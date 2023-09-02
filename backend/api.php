<?php
$con = mysqli_connect("localhost","root","","API_DATA");
$response = array();
if($con)
{
    echo "Connection Successfull";
    //fetch the data from the database
    $sql = "SELECT * FROM data";
    $result = mysqli_query($con,$sql);
    if($result)
    {
        header("Content-Type: JSON");
        $i=0;
        while($row = mysqli_fetch_assoc($result)){
            $response[$i]["id"] = $row["id"];
            $response[$i]["name"] = $row["name"];
            $response[$i]["age"] = $row["age"];
            $response[$i]["email"] = $row["email"];
            $i++;
        }
        echo json_encode($response,JSON_PRETTY_PRINT);
    }
    else
    {
        echo "Failed";
    }

}
else
{
    echo "Connection Failed";
}


?>
