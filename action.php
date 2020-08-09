<html>
	<body>
	
		<?php
			$servername = "localhost";
			$username = "root";
			$password = "";
			$db = "exampledatabase";
			
			$name = $_POST["Name"];
			$email = $_POST["Email"];
			$timestamp = date('Y-m-d H:i:s', time());
			
			// Create connection
			$link = mysqli_connect($servername, $username, $password, $db);

			// Check connection
			if($link === false){
				die("ERROR: Could not connect. " . mysqli_connect_error());
			}
			
			if (!mysqli_select_db($link, $db)) {
				die("Uh oh, couldn't select database $db");
			}
			
			$sql = "INSERT INTO storage (name, email, timestamp) VALUES ('$name', '$email', '$timestamp')";
			
			if(mysqli_query($link, $sql)){
				echo "Records inserted successfully.";
			} else{
				echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
			}
			
			// Close connection
			mysqli_close($link);
		?>

		Name: <?php echo $name ;?> <br>
		Your email address is: <?php echo $email; ?> <br> 
		<?php echo $timestamp;?>

	</body>
</html>