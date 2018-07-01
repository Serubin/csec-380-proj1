<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Auth test</title>

</head>
<body>
<p id="out">Test has failed</p>
	<script type="text/javascript">
var req = new XMLHttpRequest();
req.open("GET", "//Authenticate");
document.getElementById("out").innerHTML = req.responseText;
</script>
</body>
</html>