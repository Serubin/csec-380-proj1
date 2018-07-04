<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Auth test</title>

</head>
<body>
<form id="loginform" action="Authenticate" method="post">
<input type="text" name="username" /><br>
<input type="password" name = "password" />
<br>
<input type="submit" value="login"></input>
<br>
</form>
<p id="out">Test has failed</p>
	<script type="text/javascript">
var req = new XMLHttpRequest();
req.open("GET", "AuthSkitter/Authenticate");
document.getElementById("out").innerHTML = req.responseText;
</script>
</body>
</html>